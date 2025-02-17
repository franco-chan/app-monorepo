import { useMemo } from 'react';

import BigNumber from 'bignumber.js';

import type {
  IDecodedTx,
  IEncodedTxUpdatePayloadTransfer,
} from '@onekeyhq/engine/src/vaults/types';
import { IEncodedTxUpdateType } from '@onekeyhq/engine/src/vaults/types';

import backgroundApiProxy from '../../../../background/instance/backgroundApiProxy';
import {
  useActiveSideAccount,
  useTokenBalanceWithoutFrozen,
} from '../../../../hooks';
import { TxDetailView } from '../../../TxDetail/TxDetailView';
import { BaseSendConfirmModal } from '../../components/BaseSendConfirmModal';
import { getTransferAmountToUpdate } from '../../utils/useTransferAmountToUpdate';

import type {
  ITxConfirmViewProps,
  TransferSendParamsPayload,
} from '../../types';

// For native transfer only
function SendConfirmTransfer(props: ITxConfirmViewProps) {
  const {
    payload,
    feeInfoPayload,
    feeInput,
    decodedTx: decodedTxInfo,
    advancedSettingsForm,
  } = props;
  const decodedTx = decodedTxInfo as IDecodedTx;
  const { accountId, networkId } = useActiveSideAccount(props);
  const transferPayload = payload as TransferSendParamsPayload | undefined;
  const isTransferNativeToken = !transferPayload?.token?.idOnNetwork;

  // TODO check only supports transferPayload, decodedTx.actions[0].type=== nativeTransfer

  const balance = useTokenBalanceWithoutFrozen({
    networkId,
    accountId,
    token: {
      tokenIdOnNetwork: transferPayload?.token?.idOnNetwork,
      sendAddress: transferPayload?.token?.sendAddress,
    },
    useRecycleBalance: transferPayload?.token.isNative,
  });

  const isNativeMaxSend = useMemo(() => {
    if (!transferPayload) {
      return false;
    }

    if (isTransferNativeToken) {
      const amountBN = new BigNumber(transferPayload.value ?? 0);
      const balanceBN = new BigNumber(balance);
      const feeBN = new BigNumber(feeInfoPayload?.current?.totalNative ?? 0);

      if (amountBN.plus(feeBN).gte(balanceBN)) {
        return true;
      }
    }
    return false;
  }, [transferPayload, isTransferNativeToken, balance, feeInfoPayload]);
  const transferAmount = useMemo(() => {
    if (!transferPayload) {
      return '0';
    }
    if (isNativeMaxSend) {
      return getTransferAmountToUpdate({
        decodedTx,
        balance,
        amount: transferPayload.value,
        totalNativeGasFee: feeInfoPayload?.current?.totalNative,
      });
    }

    return transferPayload.value ?? '0';
  }, [transferPayload, isNativeMaxSend, decodedTx, balance, feeInfoPayload]);

  const isAmountNegative = useMemo(
    () => new BigNumber(transferAmount).lt(0),
    [transferAmount],
  );
  const transferAmountToUpdate = useMemo(
    () =>
      isAmountNegative && transferPayload
        ? transferPayload.value
        : transferAmount,
    [isAmountNegative, transferAmount, transferPayload],
  );
  return (
    <BaseSendConfirmModal
      {...props}
      confirmDisabled={isAmountNegative}
      updateEncodedTxBeforeConfirm={async (tx) => {
        if (!!transferPayload && isNativeMaxSend) {
          const updatePayload: IEncodedTxUpdatePayloadTransfer = {
            amount: transferAmountToUpdate,
            totalBalance: balance,
            feeInfo: feeInfoPayload?.info,
          };
          const newTx = await backgroundApiProxy.engine.updateEncodedTx({
            networkId,
            accountId,
            encodedTx: tx,
            payload: updatePayload,
            options: {
              type: IEncodedTxUpdateType.transfer,
            },
          });
          return Promise.resolve(newTx);
        }
        return Promise.resolve(tx);
      }}
    >
      <TxDetailView
        isSendConfirm
        isSingleTransformMode
        decodedTx={decodedTx}
        feeInput={feeInput}
        transferAmount={transferAmountToUpdate}
        advancedSettingsForm={advancedSettingsForm}
      />
    </BaseSendConfirmModal>
  );
}

export { SendConfirmTransfer };
