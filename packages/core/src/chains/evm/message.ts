import * as signUtil from '@metamask/eth-sig-util'; // TODO patch legacyToBuffer in app-monorepo
import * as ethUtil from 'ethereumjs-util';

import { EUnsignedMessageTypeEvm } from '../../types';

type HashMessageParams =
  | {
      messageType:
        | EUnsignedMessageTypeEvm.ETH_SIGN
        | EUnsignedMessageTypeEvm.PERSONAL_SIGN;
      message: string;
    }
  | {
      messageType: EUnsignedMessageTypeEvm.TYPE_DATA_V1;
      message: string | Array<unknown>;
    }
  | {
      messageType:
        | EUnsignedMessageTypeEvm.TYPE_DATA_V3
        | EUnsignedMessageTypeEvm.TYPE_DATA_V4;
      message: string | Record<string, unknown>;
    };

const hashMessage = ({ messageType, message }: HashMessageParams): string => {
  switch (messageType) {
    case EUnsignedMessageTypeEvm.ETH_SIGN:
      return ethUtil.addHexPrefix(message);
    case EUnsignedMessageTypeEvm.PERSONAL_SIGN:
      return ethUtil.addHexPrefix(
        ethUtil
          // @ts-ignore
          .hashPersonalMessage(signUtil.legacyToBuffer(message))
          .toString('hex'),
      );
    case EUnsignedMessageTypeEvm.TYPE_DATA_V1:
      return ethUtil.addHexPrefix(
        signUtil.typedSignatureHash(
          typeof message === 'string' ? JSON.parse(message) : message,
        ),
      );
    case EUnsignedMessageTypeEvm.TYPE_DATA_V3:
      return ethUtil.addHexPrefix(
        signUtil.TypedDataUtils.eip712Hash(
          typeof message === 'string' ? JSON.parse(message) : message,
          signUtil.SignTypedDataVersion.V3,
        ).toString('hex'),
      );
    case EUnsignedMessageTypeEvm.TYPE_DATA_V4:
      return ethUtil.addHexPrefix(
        signUtil.TypedDataUtils.eip712Hash(
          typeof message === 'string' ? JSON.parse(message) : message,
          signUtil.SignTypedDataVersion.V4,
        ).toString('hex'),
      );

    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Invalid messageType: ${messageType}`);
  }
};

export { hashMessage };
