import { useCallback } from 'react';

import BigNumber from 'bignumber.js';
import { isNil } from 'lodash';
import { useIntl } from 'react-intl';

import { Alert, Box, Container, Text } from '@onekeyhq/components';
import { OnekeyNetwork } from '@onekeyhq/shared/src/config/networkIds';

import { useNavigation, useNetworkSimple } from '../../hooks';
import {
  ModalRoutes,
  RootRoutes,
  TransactionDetailModalRoutes,
} from '../../routes/routesEnum';
import { MAX_ACTIONS_DISPLAY_IN_CONFIRM } from '../Send/constants';

import { TxDetailAdvanceInfoBox } from './components/TxDetailAdvanceInfoBox';
import { TxDetailExtraInfoBox } from './components/TxDetailExtraInfoBox';
import { TxTopInfoBox } from './components/TxDetailTopInfoBox';
import { TxDetailUtxosEntry } from './components/TxDetailUtxosEntry';
import { TxInteractInfo } from './components/TxInteractInfo';
import { getReplacedTxAlertTextKeys } from './elements/TxActionElementReplacedTxText';
import { TxActionsListView } from './TxActionsListView';
import { TxDetailContextProvider } from './TxDetailContext';
import { getTxActionMeta } from './utils/getTxActionMeta';
import { getDisplayedActions } from './utils/utilsTxDetail';

import type { ITxActionListViewProps } from './types';

export function TxDetailView(props: ITxActionListViewProps) {
  const {
    historyTx,
    decodedTx,
    isHistoryDetail,
    isSendConfirm,
    isBatchSendConfirm,
    sendConfirmParamsParsed,
    advancedSettingsForm,
    transferAmount,
    transformType = 'T1',
    isSingleTransformMode,
  } = props;
  const replacedTxTextKeys = getReplacedTxAlertTextKeys({ historyTx });
  const network = useNetworkSimple(decodedTx.networkId);
  const intl = useIntl();

  const displayedActions = getDisplayedActions({ decodedTx });
  const navigation = useNavigation();

  const isMultipleActions = displayedActions.length > 1;

  const renderMultiActionsItem = useCallback(() => {
    const actions = [];
    const actionCount = displayedActions.length;
    for (
      let i = 0,
        len = BigNumber.min(
          actionCount,
          MAX_ACTIONS_DISPLAY_IN_CONFIRM,
        ).toNumber();
      i < len;
      i += 1
    ) {
      const action = displayedActions[i];
      const metaInfo = getTxActionMeta({
        action,
        decodedTx,
        intl,
        historyTx: undefined,
      });

      if (!isNil(transferAmount)) {
        metaInfo.meta.transferAmount = transferAmount;
      }

      const { meta, components } = metaInfo;
      const TxActionComponent = components[transformType];

      actions.push(
        <Container.Item
          wrap={
            <TxActionComponent
              {...metaInfo.props}
              meta={meta}
              network={network}
            />
          }
          hidePadding
          key={i}
        />,
      );
    }

    if (actionCount > MAX_ACTIONS_DISPLAY_IN_CONFIRM) {
      actions.push(
        <Text
          typography="Body2Strong"
          color="text-subdued"
          paddingY={4}
          textAlign="center"
        >
          {intl.formatMessage(
            { id: 'action__str_more_actions' },
            { count: actionCount - MAX_ACTIONS_DISPLAY_IN_CONFIRM },
          )}
        </Text>,
      );
    }

    return actions;
  }, [
    decodedTx,
    displayedActions,
    intl,
    network,
    transferAmount,
    transformType,
  ]);

  const shouldCollapseActions = isHistoryDetail
    ? isMultipleActions
    : !isSingleTransformMode || isMultipleActions;

  const interactInfo = decodedTx?.interactInfo;

  return (
    <>
      {replacedTxTextKeys && replacedTxTextKeys.length ? (
        <Box testID="replacedTxTextKeys" mb={6}>
          <Alert
            title={intl.formatMessage({ id: replacedTxTextKeys[0] })}
            description={intl.formatMessage({ id: replacedTxTextKeys[1] })}
            alertType="info"
          />
        </Box>
      ) : null}

      <TxDetailContextProvider
        isMultipleActions
        isHistoryDetail={isHistoryDetail}
        isSendConfirm={isSendConfirm}
        sendConfirmParamsParsed={sendConfirmParamsParsed}
        isCollapse={shouldCollapseActions}
        isBatchSendConfirm={isBatchSendConfirm}
      >
        <>
          <TxTopInfoBox {...props} />
          {isSendConfirm ? (
            <TxInteractInfo
              origin={
                interactInfo?.url ??
                sendConfirmParamsParsed?.sourceInfo?.origin ??
                ''
              }
              name={interactInfo?.name}
              icon={interactInfo?.icons[0]}
              networkId={decodedTx?.networkId ?? ''}
            />
          ) : null}
          <TxDetailExtraInfoBox {...props} />
          <TxDetailAdvanceInfoBox {...props} />
          {advancedSettingsForm}

          <Box mt={isSingleTransformMode || isHistoryDetail ? 6 : 0} flex={1}>
            {isSendConfirm ? null : (
              <Text
                typography="Subheading"
                textTransform="uppercase"
                mb={3}
                color="text-subdued"
              >
                {intl.formatMessage({ id: 'form__transaction' })}
              </Text>
            )}

            {shouldCollapseActions ? (
              <Container.Box
                p="0"
                borderWidth={1}
                borderColor="border-subdued"
                flex={1}
              >
                {renderMultiActionsItem()}
              </Container.Box>
            ) : (
              <TxActionsListView {...props} transformType="T1" space={6} />
            )}
          </Box>

          {[OnekeyNetwork.btc, OnekeyNetwork.tbtc].includes(
            decodedTx.networkId,
          ) ? (
            <TxDetailUtxosEntry
              style={{ mt: 6 }}
              onPress={() => {
                navigation.navigate(RootRoutes.Modal, {
                  screen: ModalRoutes.TransactionDetail,
                  params: {
                    screen: TransactionDetailModalRoutes.UtxoDetailModal,
                    params: {
                      decodedTx,
                    },
                  },
                });
              }}
            />
          ) : null}
        </>
      </TxDetailContextProvider>
    </>
  );
}
