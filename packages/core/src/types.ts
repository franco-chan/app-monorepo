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
