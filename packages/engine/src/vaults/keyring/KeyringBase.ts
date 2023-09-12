/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/require-await */
// eslint-disable-next-line max-classes-per-file
import type { CoreChainApiBase } from '@onekeyhq/core/src/chains/_base/CoreChainApiBase';
import type { SignedTx, UnsignedTx } from '@onekeyhq/engine/src/types/provider';
import { OneKeyInternalError } from '@onekeyhq/shared/src/errors';

import { IVaultOptions } from '../types';
import { VaultContext } from '../VaultContext';

import type { DBAccount } from '../../types/account';
import type { CredentialSelector } from '../../types/credential';
import type {
  IGetAddressParams,
  IPrepareAccountByAddressIndexParams,
  IPrepareAccountsParams,
  ISignCredentialOptions,
  ISignedTxPro,
  IUnsignedTxPro,
} from '../types';
import type { VaultBase } from '../VaultBase';

export abstract class KeyringBase extends VaultContext {
  constructor(vault: VaultBase) {
    super(vault.options);
    this.vault = vault;
  }

  vault: VaultBase;

  chainApi: CoreChainApiBase | undefined;

  getChainApi(): CoreChainApiBase {
    if (!this.chainApi) {
      throw new OneKeyInternalError('chainApi is undefined');
    }
    return this.chainApi;
  }

  abstract signTransaction(
    unsignedTx: IUnsignedTxPro,
    options: ISignCredentialOptions,
  ): Promise<ISignedTxPro>;

  // TODO: check history is added
  abstract signMessage(
    messages: any[],
    options: ISignCredentialOptions,
  ): Promise<string[]>;

  abstract prepareAccounts(
    params: IPrepareAccountsParams,
  ): Promise<Array<DBAccount>>;

  abstract getAddress(params: IGetAddressParams): Promise<string>;

  abstract batchGetAddress(
    params: IGetAddressParams[],
  ): Promise<{ path: string; address: string }[]>;

  override async addressFromBase(account: DBAccount) {
    return this.vault.addressFromBase(account);
  }

  abstract prepareAccountByAddressIndex(
    params: IPrepareAccountByAddressIndexParams,
  ): Promise<Array<DBAccount>>;
}

// @ts-ignore
export class KeyringBaseMock extends KeyringBase {}
