// TODO move to core

import type {
  ISignedTxPro,
  IUnsignedTxPro,
} from '@onekeyhq/engine/src/vaults/types';

import { CoreChainApiBase } from '../_base/CoreChainApiBase';

import type {
  ICoreApiGetAddressesQuery,
  ICoreApiGetAddressesResult,
  IUnsignedMessage,
} from '../../types';

export default abstract class CoreChainSoftware extends CoreChainApiBase {
  override getAddresses(
    query: ICoreApiGetAddressesQuery,
  ): Promise<ICoreApiGetAddressesResult> {
    throw new Error('Method not implemented.');
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
