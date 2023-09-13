import bs58check from 'bs58check';
import { omit } from 'lodash';

import coreChainApi from '@onekeyhq/core/src/instance/coreChainApi';
import { secp256k1 } from '@onekeyhq/engine/src/secret/curves';
import { KeyringImported as KeyringImportedBtcFork } from '@onekeyhq/engine/src/vaults/utils/btcForkChain/KeyringImported';
import { OneKeyInternalError } from '@onekeyhq/shared/src/errors';
import bufferUtils from '@onekeyhq/shared/src/utils/bufferUtils';

import { AccountType } from '../../../types/account';
import { AddressEncodings } from '../../utils/btcForkChain/types';
import { initBitcoinEcc } from '../../utils/btcForkChain/utils';

import type { DBUTXOAccount } from '../../../types/account';
import type { IPrepareImportedAccountsParams } from '../../types';
import type BTCForkVault from '../../utils/btcForkChain/VaultBtcFork';

export class KeyringImported extends KeyringImportedBtcFork {
  override chainApi = coreChainApi.btc.imported;

  override async prepareAccounts(
    params: IPrepareImportedAccountsParams,
  ): Promise<DBUTXOAccount[]> {
    initBitcoinEcc();
    const { privateKey, name, template } = params;
    const provider = await (
      this.vault as unknown as BTCForkVault
    ).getProvider();
    const { network } = provider;
    const COIN_TYPE = (this.vault as unknown as BTCForkVault).getCoinType();
    let addressEncoding;
    if (template) {
      if (template.startsWith(`m/44'/`)) {
        addressEncoding = AddressEncodings.P2PKH;
      } else if (template.startsWith(`m/86'/`)) {
        addressEncoding = AddressEncodings.P2TR;
      } else {
        addressEncoding = undefined;
      }
    }

    if (!network.networkChainCode) {
      throw new Error('networkChainCode is empty');
    }

    const { xpub, xpubSegwit, publicKey, address, addresses } =
      await this.chainApi.getAddressFromPrivate({
        template,
        btcForkChainCode: network.networkChainCode,
        privateKeyRaw: bufferUtils.bytesToHex(privateKey),
      });

    if (!xpub || !addresses) {
      throw new Error('xpub is empty');
    }

    return Promise.resolve([
      {
        id: `imported--${COIN_TYPE}--${xpub}--${
          addressEncoding === AddressEncodings.P2TR ? `86'/` : ''
        }`,
        name: name || '',
        type: AccountType.UTXO,
        path: '',
        coinType: COIN_TYPE,
        pubKey: publicKey,
        xpub,
        xpubSegwit,
        address,
        addresses,
      },
    ]);
  }

  async prepareAccountsOld(
    params: IPrepareImportedAccountsParams,
  ): Promise<DBUTXOAccount[]> {
    initBitcoinEcc();
    const { privateKey, name, template } = params;
    const provider = await (
      this.vault as unknown as BTCForkVault
    ).getProvider();
    const COIN_TYPE = (this.vault as unknown as BTCForkVault).getCoinType();
    const { network } = provider;

    let xpub = '';
    let pubKey = '';

    const xprvVersionBytesNum = parseInt(
      privateKey.slice(0, 4).toString('hex'),
      16,
    );
    const versionByteOptions = [
      ...Object.values(omit(network.segwitVersionBytes, AddressEncodings.P2TR)), // TODO why
      network.bip32,
    ];
    for (const versionBytes of versionByteOptions) {
      if (versionBytes.private === xprvVersionBytesNum) {
        const publicKey = secp256k1.publicFromPrivate(privateKey.slice(46, 78));
        const pubVersionBytes = Buffer.from(
          versionBytes.public.toString(16).padStart(8, '0'),
          'hex',
        );
        try {
          xpub = bs58check.encode(
            privateKey.fill(pubVersionBytes, 0, 4).fill(publicKey, 45, 78),
          );
          pubKey = publicKey.toString('hex');
        } catch (e) {
          console.error(e);
        }
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
        xpubSegwit = `tr(${xpub})`;
      } else {
        addressEncoding = undefined;
      }
    }

    const firstAddressRelPath = '0/0';
    const { [firstAddressRelPath]: address } = provider.xpubToAddresses(
      xpub,
      [firstAddressRelPath],
      addressEncoding,
    );

    return Promise.resolve([
      {
        id: `imported--${COIN_TYPE}--${xpub}--${
          addressEncoding === AddressEncodings.P2TR ? `86'/` : ''
        }`,
        name: name || '',
        type: AccountType.UTXO,
        path: '',
        coinType: COIN_TYPE,
        pubKey,
        xpub,
        xpubSegwit,
        address,
        addresses: { [firstAddressRelPath]: address },
      },
    ]);
  }
}
