import type { AddressEncodings } from '@onekeyhq/engine/src/vaults/utils/btcForkChain/types';

export enum EUnsignedMessageTypeEvm {
  ETH_SIGN = 0,
  PERSONAL_SIGN = 1,
  TYPE_DATA_V1 = 2,
  TYPE_DATA_V3 = 3,
  TYPE_DATA_V4 = 4,
}

export type IUnsignedMessageEvm = {
  type: EUnsignedMessageTypeEvm;
  message: string;
};
export type IUnsignedMessage = IUnsignedMessageEvm;

export type ICoreApiGetAddressesQueryHdBase = {
  template: string;
  seed: string; // encryptedSeed
  entropy: string;
  password: string;
  indexes: number[];
};
export type ICoreApiGetAddressesQueryHdEvm = ICoreApiGetAddressesQueryHdBase;
export type ICoreApiGetAddressesQueryHdBtc = ICoreApiGetAddressesQueryHdBase & {
  btcForkChainCode: string;
  addressEncoding: AddressEncodings;
};
export type ICoreApiGetAddressesQueryHd =
  | ICoreApiGetAddressesQueryHdBase
  | ICoreApiGetAddressesQueryHdEvm
  | ICoreApiGetAddressesQueryHdBtc;

export type ICoreApiGetAddressQueryImportedBase = {
  privateKeyRaw: string;
};
export type ICoreApiGetAddressQueryImportedBtc =
  ICoreApiGetAddressQueryImportedBase & {
    // TODO rename networkChainCode
    btcForkChainCode: string;
    template?: string;
  };
export type ICoreApiGetAddressQueryImported =
  | ICoreApiGetAddressQueryImportedBase
  | ICoreApiGetAddressQueryImportedBtc;

export type ICoreApiGetAddressItem = {
  address: string;
  publicKey: string;
  path?: string;
  xpub?: string;
  xpubSegwit?: string;
  addresses?: { [relPath: string]: string };
};
export type ICoreApiGetAddressesResult = {
  addresses: ICoreApiGetAddressItem[];
};
