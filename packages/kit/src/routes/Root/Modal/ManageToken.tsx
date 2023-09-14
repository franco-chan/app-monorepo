import { useIsVerticalLayout } from '@onekeyhq/components';
import {
  createStackNavigator,
  makeModalStackNavigatorOptions,
} from '@onekeyhq/components/src/Navigation';

import {
  ActivateTokenAuthModal,
  AddToken,
  CustomToken,
  Listing,
  TokenRiskDetail,
  VerifiedToken,
  ViewTokenModal,
} from '../../../views/ManageTokens';
import { PriceAlertAddModal } from '../../../views/PushNotification/PriceAlertAddModal';
import { PriceAlertListModal } from '../../../views/PushNotification/PriceAlertListModal';
import { ManageTokenModalRoutes } from '../../routesEnum';

import type { ManageTokenRoutesParams } from '../../../views/ManageTokens/types';
import type { ModalRoutesType } from './types';

const ManageTokenNavigator = createStackNavigator<ManageTokenRoutesParams>();

const modalRoutes: ModalRoutesType<ManageTokenModalRoutes> = [
  {
    name: ManageTokenModalRoutes.Listing,
    component: Listing,
  },
  {
    name: ManageTokenModalRoutes.AddToken,
    component: AddToken,
  },
  {
    name: ManageTokenModalRoutes.ActivateToken,
    component: ActivateTokenAuthModal,
  },
  {
    name: ManageTokenModalRoutes.ViewToken,
    component: ViewTokenModal,
  },
  {
    name: ManageTokenModalRoutes.CustomToken,
    component: CustomToken,
  },
  {
    name: ManageTokenModalRoutes.VerifiedToken,
    component: VerifiedToken,
  },
  {
    name: ManageTokenModalRoutes.PriceAlertList,
    component: PriceAlertListModal,
  },
  {
    name: ManageTokenModalRoutes.PriceAlertAdd,
    component: PriceAlertAddModal,
  },
  {
    name: ManageTokenModalRoutes.TokenRiskDetail,
    component: TokenRiskDetail,
  },
];

const ManageTokenModalStack = () => {
  const isVerticalLayout = useIsVerticalLayout();
  return (
    <ManageTokenNavigator.Navigator
      screenOptions={(navInfo) => ({
        headerShown: false,
        ...makeModalStackNavigatorOptions({ isVerticalLayout, navInfo }),
      })}
    >
      {modalRoutes.map((route) => (
        <ManageTokenNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </ManageTokenNavigator.Navigator>
  );
};

export default ManageTokenModalStack;
export type { ManageTokenRoutesParams };
