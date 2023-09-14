import { useIsVerticalLayout } from '@onekeyhq/components';
import {
  createStackNavigator,
  makeModalStackNavigatorOptions,
} from '@onekeyhq/components/src/Navigation';
import type { Token } from '@onekeyhq/engine/src/types/token';
import { InscriptionControl } from '@onekeyhq/kit/src/views/InscriptionControl';

import { InscriptionControlModalRoutes } from '../../routesEnum';

export type InscriptionControlRoutesParams = {
  [InscriptionControlModalRoutes.InscriptionControlModal]: {
    networkId: string;
    accountId: string;
    token: Token;
    refreshRecycleBalance?: () => void;
  };
};

const InscriptionControlNavigator =
  createStackNavigator<InscriptionControlRoutesParams>();

const modalRoutes = [
  {
    name: InscriptionControlModalRoutes.InscriptionControlModal,
    component: InscriptionControl,
  },
];

const InscriptionControlModalStack = () => {
  const isVerticalLayout = useIsVerticalLayout();
  return (
    <InscriptionControlNavigator.Navigator
      screenOptions={(navInfo) => ({
        headerShown: false,
        ...makeModalStackNavigatorOptions({ isVerticalLayout, navInfo }),
      })}
    >
      {modalRoutes.map((route) => (
        <InscriptionControlNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </InscriptionControlNavigator.Navigator>
  );
};

export default InscriptionControlModalStack;
