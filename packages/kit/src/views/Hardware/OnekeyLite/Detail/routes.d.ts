/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/named */
import type { StackNavigationProp } from '@onekeyhq/components/src/Navigation';

import type { StackBasicRoutes } from '../../../../routes';

export type OnekeyLiteDetailScreenValues = {
  liteId: string;
};

export type OnekeyLiteDetailRoutesParams = {
  [StackBasicRoutes.ScreenOnekeyLiteDetail]: {
    defaultValues: OnekeyLiteDetailScreenValues;
  };
};

export type OnekeyLiteDetailNavigation = StackNavigationProp<
  OnekeyLiteDetailRoutesParams,
  StackBasicRoutes
>;
