import type { CoreChainApiBase } from '@onekeyhq/core/src/chains/_base/CoreChainApiBase';
import coreChainApi from '@onekeyhq/core/src/instance/coreChainApi';
import { secp256k1 } from '@onekeyhq/engine/src/secret/curves';
import { COINTYPE_ETH as COIN_TYPE } from '@onekeyhq/shared/src/engine/engineConsts';
import { OneKeyInternalError } from '@onekeyhq/shared/src/errors';
import bufferUtils from '@onekeyhq/shared/src/utils/bufferUtils';

import { AccountType } from '../../../types/account';
import { KeyringImportedBase } from '../../keyring/KeyringImportedBase';

import type { ChainSigner } from '../../../proxy';
import type { DBSimpleAccount } from '../../../types/account';
import type { IPrepareImportedAccountsParams } from '../../types';

export class KeyringImported extends KeyringImportedBase {
  override chainApi = coreChainApi.evm.imported;

  override getSigners(
    password: string,
    addresses: string[],
  ): Promise<Record<string, ChainSigner>> {
    throw new Error('EVM KeyringImported getSigners Method not implemented.');
  }

  override async prepareAccounts(
    params: IPrepareImportedAccountsParams,
  ): Promise<Array<DBSimpleAccount>> {
    const { name, privateKey } = params;
    if (privateKey.length !== 32) {
      throw new OneKeyInternalError('Invalid private key.');
    }
    const privateKeyRaw = bufferUtils.bytesToHex(privateKey);

    const { address, publicKey } = await this.chainApi.getAddressFromPrivate({
      privateKeyRaw,
    });

    return Promise.resolve([
      {
        id: `imported--${COIN_TYPE}--${publicKey}`,
        name: name || '',
        type: AccountType.SIMPLE,
        path: '',
        coinType: COIN_TYPE,
        pub: publicKey,
        address,
      },
    ]);
  }
}
