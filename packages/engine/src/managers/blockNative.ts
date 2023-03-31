import axios from 'axios';
import BigNumber from 'bignumber.js';

import { OnekeyNetwork } from '@onekeyhq/shared/src/config/networkIds';
import { SEPERATOR } from '@onekeyhq/shared/src/engine/engineConsts';

import { OneKeyInternalError } from '../errors';

import type {
  BlockNativeGasAPIResponse,
  BlockNativeGasInfo,
} from '../types/blockNative';

const BLOCK_NATIVE_BASE_URL = 'https://api.blocknative.com';
const SUPPORTED_CHAIN: string[] = [OnekeyNetwork.eth, OnekeyNetwork.polygon];

const getBlockNativeGasInfo = async (
  networkId: string,
): Promise<BlockNativeGasInfo> => {
  if (!SUPPORTED_CHAIN.includes(networkId)) {
    throw new OneKeyInternalError(
      'block native does not supported this network',
    );
  }

  const [, chainId] = networkId.split(SEPERATOR);
  const resp = (
    await axios.get<BlockNativeGasAPIResponse>(
      `${BLOCK_NATIVE_BASE_URL}/gasprices/blockprices`,
      {
        params: { chainid: chainId },
      },
    )
  ).data;

  if (resp.blockPrices && resp.blockPrices.length > 0) {
    const blockPrices = resp.blockPrices[0];
    const { estimatedPrices, estimatedTransactionCount, baseFeePerGas } =
      blockPrices;

    const prices = [];

    for (const price of estimatedPrices) {
      if (price.maxFeePerGas && price.maxPriorityFeePerGas) {
        prices.push({
          baseFee: new BigNumber(baseFeePerGas).toFixed(),
          confidence: price.confidence,
          maxFeePerGas: new BigNumber(price.maxFeePerGas).toFixed(),
          maxPriorityFeePerGas: new BigNumber(
            price.maxPriorityFeePerGas,
          ).toFixed(),
        });
      }
    }

    return {
      estimatedTransactionCount,
      baseFee: new BigNumber(baseFeePerGas).toFixed(),
      prices,
    };
  }

  throw new OneKeyInternalError('block native bad response');
};

export { getBlockNativeGasInfo };
