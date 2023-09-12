import { mnemonicToSeedSync } from 'bip39';
import bs58check from 'bs58check';

import coreChainApi from '@onekeyhq/core/src/instance/coreChainApi';
import {
  batchGetPublicKeys,
  generateRootFingerprint,
  mnemonicFromEntropy,
} from '@onekeyhq/engine/src/secret';
import { KeyringHd as KeyringHdBtcFork } from '@onekeyhq/engine/src/vaults/utils/btcForkChain/KeyringHd';
import {
  COINTYPE_BCH,
  COINTYPE_DOGE,
} from '@onekeyhq/shared/src/engine/engineConsts';
import { OneKeyInternalError } from '@onekeyhq/shared/src/errors';
import bufferUtils from '@onekeyhq/shared/src/utils/bufferUtils';

import { slicePathTemplate } from '../../../managers/derivation';
import { getAccountNameInfoByTemplate } from '../../../managers/impl';
import { AccountType } from '../../../types/account';
import {
  getAccountDefaultByPurpose,
  getBitcoinBip32,
  getBitcoinECPair,
  initBitcoinEcc,
  isTaprootPath,
} from '../../utils/btcForkChain/utils';

import type { ExportedSeedCredential } from '../../../dbs/base';
import type { DBUTXOAccount } from '../../../types/account';
import type { IPrepareSoftwareAccountsParams } from '../../types';
import type BTCForkVault from '../../utils/btcForkChain/VaultBtcFork';

export class KeyringHd extends KeyringHdBtcFork {
  override chainApi = coreChainApi.btc.hd;

  override async prepareAccounts(
    params: IPrepareSoftwareAccountsParams,
  ): Promise<DBUTXOAccount[]> {
    const {
      password,
      indexes,
      purpose,
      names,
      template,
      skipCheckAccountExist,
    } = params;
    initBitcoinEcc();
    const impl = await this.getNetworkImpl();
    const vault = this.vault as unknown as BTCForkVault;
    const defaultPurpose = vault.getDefaultPurpose();
    const coinName = vault.getCoinName();
    const COIN_TYPE = vault.getCoinType();

    const usedPurpose = purpose || defaultPurpose;
    const ignoreFirst = indexes[0] !== 0;
    // TODO why
    const usedIndexes = [...(ignoreFirst ? [indexes[0] - 1] : []), ...indexes];
    const { addressEncoding } = getAccountDefaultByPurpose(
      usedPurpose,
      coinName,
    );
    const { prefix: namePrefix } = getAccountNameInfoByTemplate(impl, template);
    const { seed, entropy } = (await this.engine.dbApi.getCredential(
      this.walletId,
      password,
    )) as ExportedSeedCredential;
    const provider = await (
      this.vault as unknown as BTCForkVault
    ).getProvider();
    const btcForkChainCode = provider.chainInfo.code;

    const { addresses: addressesInfo } = await this.chainApi.getAddressesFromHd(
      {
        template,
        seed: bufferUtils.bytesToHex(seed),
        entropy: bufferUtils.bytesToHex(entropy),
        password,
        indexes: usedIndexes,
        btcForkChainCode,
        addressEncoding,
      },
    );

    const ret: DBUTXOAccount[] = [];
    let index = 0;
    for (const {
      path,
      publicKey,
      xpub,
      xpubSegwit,
      address,
      addresses,
    } of addressesInfo) {
      const prefix = [COINTYPE_DOGE, COINTYPE_BCH].includes(COIN_TYPE)
        ? coinName
        : namePrefix;
      const name =
        (names || [])[index] || `${prefix} #${usedIndexes[index] + 1}`;

      if (!path || !xpub || !addresses) {
        throw new Error('path or xpub or addresses is undefined');
      }

      if (!ignoreFirst || index > 0) {
        ret.push({
          id: `${this.walletId}--${path || ''}`,
          name,
          type: AccountType.UTXO,
          path,
          coinType: COIN_TYPE,
          pubKey: publicKey,
          xpub,
          xpubSegwit,
          address,
          addresses,
          template,
        });
      }

      if (usedIndexes.length === 1) {
        // Only getting the first account, ignore balance checking.
        break;
      }

      if (skipCheckAccountExist) {
        index += 1;
      } else {
        const xpubFinal = xpubSegwit || xpub;
        if (!xpubFinal) {
          throw new Error('xpubFinal is undefined');
        }

        const { txs } = (await provider.getAccount(
          { type: 'simple', xpub: xpubFinal },
          addressEncoding,
        )) as { txs: number };
        if (txs > 0) {
          index += 1;
          // blockbook API rate limit.
          await new Promise((r) => setTimeout(r, 200));
        } else {
          // Software should prevent a creation of an account
          // if a previous account does not have a transaction history (meaning none of its addresses have been used before).
          // https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
          break;
        }
      }
    }
    return ret;
  }
}
