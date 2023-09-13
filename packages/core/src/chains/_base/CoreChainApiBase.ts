import type { Signer as ISigner } from '@onekeyhq/engine/src/types/secret';
import type {
  ISignCredentialOptions,
  ISignedTxPro,
  IUnsignedTxPro,
} from '@onekeyhq/engine/src/vaults/types';

import type {
  ICoreApiGetAddressItem,
  ICoreApiGetAddressQueryImported,
  ICoreApiGetAddressesQueryHd,
  ICoreApiGetAddressesResult,
  IUnsignedMessage,
  IUnsignedMessageEvm,
} from '../../types';

export abstract class CoreChainApiBase {
  abstract signTransaction(query: {
    unsignedTx: IUnsignedTxPro;
    privateKey: string; // encryptedPrivateKey by password
    password: string;
  }): Promise<ISignedTxPro>;

  // TODO define types
  abstract signMessage(query: {
    unsignedMsg: IUnsignedMessage;
    privateKey: string; // encryptedPrivateKey by password
    password: string;
  }): Promise<string>;

  abstract getAddressFromPrivate(
    query: ICoreApiGetAddressQueryImported,
  ): Promise<ICoreApiGetAddressItem>;

  abstract getAddressesFromHd(
    query: ICoreApiGetAddressesQueryHd,
  ): Promise<ICoreApiGetAddressesResult>;
}
