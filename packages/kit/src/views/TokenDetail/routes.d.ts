import type { StackNavigationProp } from '@onekeyhq/components/src/Navigation';

import type { HomeRoutes } from '../../routes/routesEnum';

export type TokenDetailScreenValues = {
  accountId: string;
  networkId: string;
  tokenId: string;
};

export type TokenDetailRoutesParams = {
  [HomeRoutes.ScreenTokenDetail]: TokenDetailScreenValues;
};

export type TokenDetailNavigation = StackNavigationProp<
  TokenDetailRoutesParams,
  HomeRoutes.ScreenTokenDetail
>;
