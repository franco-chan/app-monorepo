import { useIsVerticalLayout } from '@onekeyhq/components';
import { createStackNavigator } from '@onekeyhq/components/src/Navigation';

import PreviewSend from '../../../views/ScanQrcode/PreviewSend';
import ScanQrcode from '../../../views/ScanQrcode/ScanQrcode';
import ScanQrcodeResult from '../../../views/ScanQrcode/ScanQrcodeResult';
import { ScanQrcodeRoutes } from '../../../views/ScanQrcode/types';

import type { ScanQrcodeRoutesParams } from '../../../views/ScanQrcode/types';
import type { ModalRoutesType } from './types';

const ScanQrcodeNavigator = createStackNavigator<ScanQrcodeRoutesParams>();

const modalRoutes: ModalRoutesType<ScanQrcodeRoutes> = [
  {
    name: ScanQrcodeRoutes.ScanQrcode,
    component: ScanQrcode,
  },
  { name: ScanQrcodeRoutes.ScanQrcodeResult, component: ScanQrcodeResult },

  {
    name: ScanQrcodeRoutes.PreviewSend,
    component: PreviewSend,
  },
];

const ScanQrcodeStack = () => {
  const isVerticalLayout = useIsVerticalLayout();
  return (
    <ScanQrcodeNavigator.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: !!isVerticalLayout,
      }}
    >
      {modalRoutes.map((route) => (
        <ScanQrcodeNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </ScanQrcodeNavigator.Navigator>
  );
};

export default ScanQrcodeStack;
export type { ScanQrcodeRoutesParams };
