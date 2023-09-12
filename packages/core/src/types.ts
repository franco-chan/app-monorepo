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
export type ICoreApiGetAddressesQueryImported = {
  privateKeysRaw: string[];
};
export type ICoreApiGetAddressesQueryHd = {
  template: string;
  seed: string; // encryptedSeed
  password: string;
  indexes: number[];
};
export type ICoreApiGetAddressesQuery = {
  imported?: ICoreApiGetAddressesQueryImported;
  hd?: ICoreApiGetAddressesQueryHd;
  // hardware?
};
export type ICoreApiGetAddressesResult = {
  addresses: Array<{
    address: string;
    publicKey: string;
    path?: string;
  }>;
};
