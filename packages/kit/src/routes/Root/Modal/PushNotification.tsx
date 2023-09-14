import { useIsVerticalLayout } from '@onekeyhq/components';
import { createStackNavigator } from '@onekeyhq/components/src/Navigation';

import GuideToPushFirstTime from '../../../views/PushNotification/GuideToPushFirstTime';
import { PushNotificationRoutes } from '../../../views/PushNotification/types';

import type { PushNotificationRoutesParams } from '../../../views/PushNotification/types';

const PushNotificationNavigator =
  createStackNavigator<PushNotificationRoutesParams>();

const modalRoutes = [
  {
    name: PushNotificationRoutes.GuideToPushFirstTime,
    component: GuideToPushFirstTime,
  },
];

const PushNotificationModalStack = () => {
  const isVerticalLayout = useIsVerticalLayout();
  return (
    <PushNotificationNavigator.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: !!isVerticalLayout,
      }}
    >
      {modalRoutes.map((route) => (
        <PushNotificationNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </PushNotificationNavigator.Navigator>
  );
};

export default PushNotificationModalStack;
export type { PushNotificationRoutesParams };
