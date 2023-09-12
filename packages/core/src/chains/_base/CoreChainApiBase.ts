import type { Signer as ISigner } from '@onekeyhq/engine/src/types/secret';
import type {
  ISignCredentialOptions,
  ISignedTxPro,
  IUnsignedTxPro,
} from '@onekeyhq/engine/src/vaults/types';

import type {
  ICoreApiGetAddressesQuery,
  ICoreApiGetAddressesResult,
  IUnsignedMessageEvm,
} from '../../types';

export abstract class CoreChainApiBase {
  abstract signTransaction({
    unsignedTx,
    privateKey,
    password,
  }: {
    unsignedTx: IUnsignedTxPro;
    privateKey: string; // encryptedPrivateKey by password
    password: string;
  }): Promise<ISignedTxPro>;

  abstract signMessage({
    unsignedMsg,
    privateKey,
    password,
  }: {
    unsignedMsg: IUnsignedMessageEvm;
    privateKey: string; // encryptedPrivateKey by password
    password: string;
  }): Promise<string>;

  abstract getAddresses(
    query: ICoreApiGetAddressesQuery,
  ): Promise<ICoreApiGetAddressesResult>;
}
