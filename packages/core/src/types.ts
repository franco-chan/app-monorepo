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
export type ICoreApiGetAddressesQueryImported = {
  privateKeysRaw: string[];
};
export type ICoreApiGetAddressesQueryHdBase = {
  template: string;
  seed: string; // encryptedSeed
  entropy: string;
  password: string;
  indexes: number[];
};
export type ICoreApiGetAddressesQueryHdBtc = ICoreApiGetAddressesQueryHdBase & {
  btcForkChainCode: string;
  addressEncoding: AddressEncodings;
};
export type ICoreApiGetAddressesQueryHd =
  | ICoreApiGetAddressesQueryHdBtc
  | ICoreApiGetAddressesQueryHdBase;
export type ICoreApiGetAddressesQuery = {
  imported?: ICoreApiGetAddressesQueryImported;
  hd?: ICoreApiGetAddressesQueryHd;
  // hardware?
};
export type ICoreApiGetAddressesItem = {
  address: string;
  publicKey: string;
  path?: string;
  xpub?: string;
  xpubSegwit?: string;
  addresses?: { [relPath: string]: string };
};
export type ICoreApiGetAddressesResult = {
  addresses: ICoreApiGetAddressesItem[];
};
