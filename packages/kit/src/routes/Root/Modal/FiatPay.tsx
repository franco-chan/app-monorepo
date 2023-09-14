import { useIsVerticalLayout } from '@onekeyhq/components';
import {
  createStackNavigator,
  makeModalStackNavigatorOptions,
} from '@onekeyhq/components/src/Navigation';

import MoonpayWebView from '../../../views/FiatPay/MoonpayWebView';
import SupportTokenList from '../../../views/FiatPay/SupportTokenList';
import { FiatPayModalRoutes } from '../../routesEnum';

import type { FiatPayModeType } from '../../../views/FiatPay/types';

export type FiatPayModalRoutesParams = {
  [FiatPayModalRoutes.SupportTokenListModal]: {
    networkId: string;
    accountId: string;
    type?: FiatPayModeType;
  };
  [FiatPayModalRoutes.MoonpayWebViewModal]: { url: string };
};

const BuyNavigator = createStackNavigator<FiatPayModalRoutesParams>();
const modalRoutes = [
  {
    name: FiatPayModalRoutes.SupportTokenListModal,
    component: SupportTokenList,
  },
  {
    name: FiatPayModalRoutes.MoonpayWebViewModal,
    component: MoonpayWebView,
  },
];

const FiatPayModalStack = () => {
  const isVerticalLayout = useIsVerticalLayout();
  return (
    <BuyNavigator.Navigator
      screenOptions={(navInfo) => ({
        headerShown: false,
        ...makeModalStackNavigatorOptions({ isVerticalLayout, navInfo }),
      })}
    >
      {modalRoutes.map((route) => (
        <BuyNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </BuyNavigator.Navigator>
  );
};

export default FiatPayModalStack;
