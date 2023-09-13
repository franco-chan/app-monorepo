// TODO move to core

import { mnemonicToSeedSync } from 'bip39';
import * as BitcoinJS from 'bitcoinjs-lib';
import bs58check from 'bs58check';
import { omit } from 'lodash';

import { slicePathTemplate } from '@onekeyhq/engine/src/managers/derivation';
import {
  CKDPub,
  batchGetPublicKeys,
  generateRootFingerprint,
  mnemonicFromEntropy,
} from '@onekeyhq/engine/src/secret';
import { secp256k1 } from '@onekeyhq/engine/src/secret/curves';
import type {
  ISignedTxPro,
  IUnsignedTxPro,
} from '@onekeyhq/engine/src/vaults/types';
import type {
  IBtcForkExtendedNetworks,
  IBtcForkNetwork,
} from '@onekeyhq/engine/src/vaults/utils/btcForkChain/provider/networks';
import { getBtcForkNetwork } from '@onekeyhq/engine/src/vaults/utils/btcForkChain/provider/networks';
import { AddressEncodings } from '@onekeyhq/engine/src/vaults/utils/btcForkChain/types';
import {
  getBitcoinBip32,
  getBitcoinECPair,
  initBitcoinEcc,
  isTaprootPath,
} from '@onekeyhq/engine/src/vaults/utils/btcForkChain/utils';
import { OneKeyInternalError } from '@onekeyhq/shared/src/errors';
import bufferUtils from '@onekeyhq/shared/src/utils/bufferUtils';

import { CoreChainApiBase } from '../_base/CoreChainApiBase';

import type {
  ICoreApiGetAddressItem,
  ICoreApiGetAddressQueryImported,
  ICoreApiGetAddressQueryImportedBtc,
  ICoreApiGetAddressesQueryHdBtc,
  ICoreApiGetAddressesResult,
  IUnsignedMessage,
} from '../../types';

export default abstract class CoreChainSoftware extends CoreChainApiBase {
  // TODO memo and move to utils (file with getBtcForkNetwork)
  getVersionBytesToEncodings({
    btcForkChainCode,
  }: {
    btcForkChainCode: string | undefined;
  }): {
    public: Record<number, Array<AddressEncodings>>;
    private: Record<number, Array<AddressEncodings>>;
  } {
    const network = getBtcForkNetwork(btcForkChainCode);
    const tmp: {
      public: {
        [bytes: number]: AddressEncodings[];
      };
      private: {
        [bytes: number]: AddressEncodings[];
      };
    } = {
      public: { [network.bip32.public]: [AddressEncodings.P2PKH] },
      private: { [network.bip32.private]: [AddressEncodings.P2PKH] },
    };
    Object.entries(network.segwitVersionBytes || {}).forEach(
      ([
        encoding,
        { public: publicVersionBytes, private: privateVersionBytes },
      ]) => {
        tmp.public[publicVersionBytes] = [
          ...(tmp.public[publicVersionBytes] || []),
          encoding as AddressEncodings,
        ];
        tmp.private[privateVersionBytes] = [
          ...(tmp.private[privateVersionBytes] || []),
          encoding as AddressEncodings,
        ];
      },
    );
    return tmp;
  }

  private pubkeyToPayment({
    pubkey,
    encoding,
    network,
  }: {
    pubkey: Buffer;
    encoding: AddressEncodings;
    network: IBtcForkNetwork;
  }): BitcoinJS.Payment {
    initBitcoinEcc();
    let payment: BitcoinJS.Payment = {
      pubkey,
      network,
    };

    switch (encoding) {
      case AddressEncodings.P2PKH:
        payment = BitcoinJS.payments.p2pkh(payment);
        break;

      case AddressEncodings.P2WPKH:
        payment = BitcoinJS.payments.p2wpkh(payment);
        break;

      case AddressEncodings.P2SH_P2WPKH:
        payment = BitcoinJS.payments.p2sh({
          redeem: BitcoinJS.payments.p2wpkh(payment),
          network,
        });
        break;
      case AddressEncodings.P2TR:
        payment = BitcoinJS.payments.p2tr({
          internalPubkey: pubkey.slice(1, 33),
          network,
        });
        break;

      default:
        throw new Error(`Invalid encoding: ${encoding as string}`);
    }

    return payment;
  }

  getAddressFromXpub({
    network,
    xpub,
    relativePaths,
    addressEncoding,
  }: {
    network: IBtcForkNetwork;
    xpub: string;
    relativePaths: Array<string>;
    addressEncoding?: AddressEncodings;
  }): Record<string, string> {
    // Only used to generate addresses locally.
    const decodedXpub = bs58check.decode(xpub);
    const versionBytes = parseInt(decodedXpub.slice(0, 4).toString('hex'), 16);
    const encoding =
      addressEncoding ??
      this.getVersionBytesToEncodings({
        btcForkChainCode: network.networkChainCode,
      }).public[versionBytes][0];

    const ret: Record<string, string> = {};

    const startExtendedKey = {
      chainCode: decodedXpub.slice(13, 45),
      key: decodedXpub.slice(45, 78),
    };

    const cache = new Map();
    // const leaf = null;
    for (const path of relativePaths) {
      let extendedKey = startExtendedKey;
      let relPath = '';

      const parts = path.split('/');
      for (const part of parts) {
        relPath += relPath === '' ? part : `/${part}`;
        if (cache.has(relPath)) {
          extendedKey = cache.get(relPath);
          // eslint-disable-next-line no-continue
          continue;
        }

        const index = part.endsWith("'")
          ? parseInt(part.slice(0, -1)) + 2 ** 31
          : parseInt(part);
        extendedKey = CKDPub('secp256k1', extendedKey, index);
        cache.set(relPath, extendedKey);
      }

      // const pubkey = taproot && inscribe ? fixedPublickey : extendedKey.key;
      let { address } = this.pubkeyToPayment({
        network,
        pubkey: extendedKey.key,
        encoding,
      });
      if (typeof address === 'string' && address.length > 0) {
        address = this.encodeAddress(address);
        ret[path] = address;
      }
    }
    return ret;
  }

  encodeAddress(address: string) {
    return address;
  }

  override async getAddressFromPrivate(
    query: ICoreApiGetAddressQueryImportedBtc,
  ): Promise<ICoreApiGetAddressItem> {
    const { privateKeyRaw, btcForkChainCode, template } = query;
    const privateKey = bufferUtils.toBuffer(privateKeyRaw);

    let xpub = '';
    let pubKey = '';
    const network = getBtcForkNetwork(btcForkChainCode);

    const xprvVersionBytesNum = parseInt(
      privateKey.slice(0, 4).toString('hex'),
      16,
    );
    const versionByteOptions = [
      // ...Object.values(network.segwitVersionBytes || {}),
      ...Object.values(omit(network.segwitVersionBytes, AddressEncodings.P2TR)),
      network.bip32,
    ];

    for (const versionBytes of versionByteOptions) {
      if (versionBytes.private === xprvVersionBytesNum) {
        const privateKeySlice = privateKey.slice(46, 78);
        const publicKey = secp256k1.publicFromPrivate(privateKeySlice);
        const pubVersionBytes = Buffer.from(
          versionBytes.public.toString(16).padStart(8, '0'),
          'hex',
        );
        const keyPair = getBitcoinECPair().fromPrivateKey(privateKeySlice, {
          network,
        });
        try {
          xpub = bs58check.encode(
            privateKey.fill(pubVersionBytes, 0, 4).fill(publicKey, 45, 78),
          );
          // "02ef3f230c658514a2de5191e57af38e0c94f2f28f1cec1a0febfc6ff004dc6b43"
          const publicKeyStr1 = keyPair.publicKey.toString('hex');
          const publicKeyStr2 = publicKey.toString('hex');
          // TODO publicKey is different with HD account
          pubKey = publicKeyStr2;
        } catch (e) {
          console.error(e);
        }
        break;
      }
    }
    if (xpub === '') {
      throw new OneKeyInternalError('Invalid private key.');
    }

    let addressEncoding;
    let xpubSegwit = xpub;
    if (template) {
      if (template.startsWith(`m/44'/`)) {
        addressEncoding = AddressEncodings.P2PKH;
      } else if (template.startsWith(`m/86'/`)) {
        addressEncoding = AddressEncodings.P2TR;
        // TODO if (isTaprootPath(pathPrefix)) {
        xpubSegwit = `tr(${xpub})`;
      } else {
        addressEncoding = undefined;
      }
    }

    const firstAddressRelPath = '0/0';
    const { [firstAddressRelPath]: address } = this.getAddressFromXpub({
      network,
      xpub,
      relativePaths: [firstAddressRelPath],
      addressEncoding,
    });
    return Promise.resolve({
      publicKey: pubKey,
      xpub,
      xpubSegwit,
      address,
      addresses: { [firstAddressRelPath]: address },
    });
  }

  override async getAddressesFromHd({
    template,
    seed,
    entropy,
    password,
    indexes,
    btcForkChainCode,
    addressEncoding,
  }: ICoreApiGetAddressesQueryHdBtc): Promise<ICoreApiGetAddressesResult> {
    const { pathPrefix, pathSuffix } = slicePathTemplate(template);
    const seedBuffer = bufferUtils.toBuffer(seed);

    const relPaths: string[] = indexes.map(
      (index) => `${index.toString()}'`, // btc
      // (index) => pathSuffix.replace('{index}', index.toString()), // evm
    );
    const pubkeyInfos = batchGetPublicKeys(
      'secp256k1',
      seedBuffer,
      password,
      pathPrefix,
      relPaths,
    );

    if (pubkeyInfos.length !== indexes.length) {
      throw new OneKeyInternalError('Unable to get publick key.');
    }

    if (!btcForkChainCode) {
      throw new Error('btcForkChainCode is required');
    }

    const network = getBtcForkNetwork(btcForkChainCode);

    const { public: xpubVersionBytes } =
      ((network.segwitVersionBytes || {})[
        addressEncoding
      ] as typeof network.bip32) || network.bip32;

    const entropyBuffer = bufferUtils.toBuffer(entropy);
    const mnemonic = mnemonicFromEntropy(entropyBuffer, password);
    const root = getBitcoinBip32().fromSeed(mnemonicToSeedSync(mnemonic));
    const xpubBuffers = [
      Buffer.from(xpubVersionBytes.toString(16).padStart(8, '0'), 'hex'),
      Buffer.from([3]),
    ];

    const addresses = await Promise.all(
      pubkeyInfos.map((info, index) => {
        const { path, parentFingerPrint, extendedKey } = info;

        const node = root.derivePath(`${path}/0/0`);
        const keyPair = getBitcoinECPair().fromWIF(node.toWIF());
        const publicKey = keyPair.publicKey.toString('hex');

        const xpub = bs58check.encode(
          Buffer.concat([
            ...xpubBuffers,
            parentFingerPrint,
            Buffer.from(
              (indexes[index] + 2 ** 31).toString(16).padStart(8, '0'),
              'hex',
            ),
            extendedKey.chainCode,
            extendedKey.key,
          ]),
        );

        const firstAddressRelPath = '0/0';
        const relativePaths = [firstAddressRelPath];
        const { [firstAddressRelPath]: address } = this.getAddressFromXpub({
          network,
          xpub,
          relativePaths,
          addressEncoding,
        });

        let xpubSegwit = xpub;
        if (isTaprootPath(pathPrefix)) {
          const rootFingerprint = generateRootFingerprint(
            'secp256k1',
            seedBuffer,
            password,
          );
          const fingerprint = Number(
            Buffer.from(rootFingerprint).readUInt32BE(0) || 0,
          )
            .toString(16)
            .padStart(8, '0');
          const descriptorPath = `${fingerprint}${path.substring(1)}`;
          xpubSegwit = `tr([${descriptorPath}]${xpub}/<0;1>/*)`;
        }

        const addressItem: ICoreApiGetAddressItem = {
          address,
          publicKey,
          path,
          xpub,
          xpubSegwit,
          addresses: { [firstAddressRelPath]: address },
        };
        return addressItem;
      }),
    );
    return { addresses };
  }

  override signMessage({
    unsignedMsg,
    privateKey,
    password,
  }: {
    unsignedMsg: IUnsignedMessage;
    privateKey: string;
    password: string;
  }): Promise<string> {
    throw new Error('Method not implemented.');
  }

  override signTransaction({
    unsignedTx,
    privateKey,
    password,
  }: {
    unsignedTx: IUnsignedTxPro;
    privateKey: string;
    password: string;
  }): Promise<ISignedTxPro> {
    throw new Error('Method not implemented.');
  }
}
