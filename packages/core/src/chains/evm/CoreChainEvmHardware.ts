import type {
  ISignedTxPro,
  IUnsignedTxPro,
} from '@onekeyhq/engine/src/vaults/types';

import { CoreChainApiBase } from '../_base/CoreChainApiBase';

export default class CoreChainEvmHardware extends CoreChainApiBase {
  getAddressesFromHw({
    template,
    seed,
    password,
    indexes,
  }: {
    template: string;
    seed: string; // encryptedSeed
    password: string;
    indexes: number[];
  }) {
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
  //
}
