import { useIsVerticalLayout } from '@onekeyhq/components';
import { createStackNavigator } from '@onekeyhq/components/src/Navigation';

import OverviewProtocolDetail from '../../../views/Overview/components/OverviewDefiProtocol/ProtocolDetailModal';
import { OverviewModalRoutes } from '../../../views/Overview/types';

import type { OverviewModalRoutesParams } from '../../../views/Overview/types';

const OverviewModalNavigator =
  createStackNavigator<OverviewModalRoutesParams>();

const modalRoutes = [
  {
    name: OverviewModalRoutes.OverviewProtocolDetail,
    component: OverviewProtocolDetail,
  },
];

const OverviewModalStack = () => {
  const isVerticalLayout = useIsVerticalLayout();
  return (
    <OverviewModalNavigator.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: !!isVerticalLayout,
      }}
    >
      {modalRoutes.map((route) => (
        <OverviewModalNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </OverviewModalNavigator.Navigator>
  );
};

export default OverviewModalStack;
export type { OverviewModalRoutesParams };
