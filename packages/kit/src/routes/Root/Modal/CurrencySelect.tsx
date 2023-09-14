import { useIsVerticalLayout } from '@onekeyhq/components';
import { createStackNavigator } from '@onekeyhq/components/src/Navigation';

import CurrencySelect from '../../../views/Me/GenaralSection/CurrencySelect';
import { CurrencySelectModal } from '../../../views/Me/GenaralSection/CurrencySelect/types';

import type { CurrencySelectModalParams } from '../../../views/Me/GenaralSection/CurrencySelect/types';

type CurrencySelectModalRoutesParams = {
  [CurrencySelectModal.CurrencySelectHome]: undefined;
};

const CurrencySelectModalNavigator =
  createStackNavigator<CurrencySelectModalRoutesParams>();

const modalRoutes = [
  {
    name: CurrencySelectModal.CurrencySelectHome,
    component: CurrencySelect,
  },
];

const CurrencySelectModalStack = () => {
  const isVerticalLayout = useIsVerticalLayout();
  return (
    <CurrencySelectModalNavigator.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: !!isVerticalLayout,
      }}
    >
      {modalRoutes.map((route) => (
        <CurrencySelectModalNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </CurrencySelectModalNavigator.Navigator>
  );
};

export default CurrencySelectModalStack;
export type { CurrencySelectModalParams };
