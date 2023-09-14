import type { StackNavigationProp } from '@onekeyhq/components/src/Navigation';

import type { HomeRoutes } from '../../routes/routesEnum';

export type FullTokenListScreenValues = {
  accountId: string;
  networkId: string;
};

export type FullTokenListRoutesParams = {
  [HomeRoutes.FullTokenListScreen]: FullTokenListScreenValues;
};

export type FullTokenListNavigation = StackNavigationProp<
  FullTokenListRoutesParams,
  HomeRoutes.FullTokenListScreen
>;
