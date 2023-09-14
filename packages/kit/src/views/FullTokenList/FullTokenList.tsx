import type { FC } from 'react';

import { Box, useSafeAreaInsets } from '@onekeyhq/components';
import type { StackScreenProps } from '@onekeyhq/components/src/Navigation';

import { useActiveWalletAccount } from '../../hooks';
import { FullTokenAssetsList } from '../Wallet/AssetsList';

import type { HomeRoutes } from '../../routes/routesEnum';
import type { FullTokenListRoutesParams } from './routes';

export type FullTokenListProps = StackScreenProps<
  FullTokenListRoutesParams,
  HomeRoutes.FullTokenListScreen
>;

// type RouteProps = RouteProp<HomeRoutesParams, HomeRoutes.FullTokenListScreen>;

const FullTokenList: FC<FullTokenListProps> = () => {
  const { bottom } = useSafeAreaInsets();
  const { accountId, networkId, walletId } = useActiveWalletAccount();

  return (
    <FullTokenAssetsList
      walletId={walletId}
      accountId={accountId}
      networkId={networkId}
      flatStyle
      showTokenBalanceDetail
      ListFooterComponent={<Box h={`${48 + bottom}px`} />}
    />
  );
};
export default FullTokenList;
