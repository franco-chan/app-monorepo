import BigNumber from 'bignumber.js';

import type { CoreChainApiBase } from '@onekeyhq/core/src/chains/_base/CoreChainApiBase';
import coreChainApi from '@onekeyhq/core/src/instance/coreChainApi';
import { slicePathTemplate } from '@onekeyhq/engine/src/managers/derivation';
import { batchGetPublicKeys } from '@onekeyhq/engine/src/secret';
import { OneKeyInternalError } from '@onekeyhq/shared/src/errors';
import bufferUtils from '@onekeyhq/shared/src/utils/bufferUtils';

import {
  getAccountNameInfoByImpl,
  getAccountNameInfoByTemplate,
} from '../../../managers/impl';
import { AccountType } from '../../../types/account';
import { KeyringHdBase } from '../../keyring/KeyringHdBase';

import type { ExportedSeedCredential } from '../../../dbs/base';
import type { Signer } from '../../../proxy';
import type { DBSimpleAccount } from '../../../types/account';
import type {
  IPrepareSoftwareAccountsParams,
  ISignCredentialOptions,
  ISignedTxPro,
  IUnsignedTxPro,
} from '../../types';
import type { IEncodedTxEvm } from './Vault';

export class KeyringHd extends KeyringHdBase {
  override chainApi: CoreChainApiBase = coreChainApi.evm.hd;

  override getSigners(
    password: string,
    addresses: string[],
  ): Promise<Record<string, Signer>> {
    throw new Error('EVM KeyringHd getSigners Method not implemented.');
  }

  override async prepareAccounts(
    params: IPrepareSoftwareAccountsParams,
  ): Promise<Array<DBSimpleAccount>> {
    const { password, indexes, names, coinType, template } = params;
    const { seed } = (await this.engine.dbApi.getCredential(
      this.walletId,
      password,
    )) as ExportedSeedCredential;

    const { addresses: addressInfos } = await this.chainApi.getAddresses({
      hd: {
        template,
        seed: bufferUtils.bytesToHex(seed),
        password,
        indexes,
      },
    });

    const ret = [];
    let index = 0;
    const impl = await this.getNetworkImpl();
    const { prefix } = getAccountNameInfoByTemplate(impl, template);
    for (const info of addressInfos) {
      const { path = '', publicKey, address } = info;

      if (!path) {
        throw new Error('EVM KeyringHD prepareAccounts ERROR:  path not found');
      }

      const name = (names || [])[index] || `${prefix} #${indexes[index] + 1}`;
      const isLedgerLiveTemplate =
        getAccountNameInfoByImpl(impl).ledgerLive.template === template;
      ret.push({
        id: isLedgerLiveTemplate
          ? // because the first account path of ledger live template is the same as the bip44 account path
            `${this.walletId}--${path}--LedgerLive`
          : `${this.walletId}--${path}`,
        name,
        type: AccountType.SIMPLE,
        path,
        coinType,
        pub: publicKey,
        address,
        template,
      });
      index += 1;
    }
    return ret;
  }
}
