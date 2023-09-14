import { useIsVerticalLayout } from '@onekeyhq/components';
import {
  createStackNavigator,
  makeModalStackNavigatorOptions,
} from '@onekeyhq/components/src/Navigation';
import type { IOneKeyDeviceType } from '@onekeyhq/shared/types';

import OnekeyDeviceWalletName from '../../../views/Hardware/Onekey/OnekeyDeviceWalletName';
import OnekeyHardwareConfirm from '../../../views/Hardware/Onekey/OnekeyHardwareConfirm';
import OnekeyHardwareConnect from '../../../views/Hardware/Onekey/OnekeyHardwareConnect';
import OnekeyHardwareDetails from '../../../views/Hardware/Onekey/OnekeyHardwareDetails';
import OnekeyHardwareDeviceName from '../../../views/Hardware/Onekey/OnekeyHardwareDeviceName';
import OnekeyHardwareHomescreen from '../../../views/Hardware/Onekey/OnekeyHardwareHomescreen';
import OnekeyHardwarePinCode from '../../../views/Hardware/Onekey/OnekeyHardwarePinCode';
import OnekeyHardwareVerify from '../../../views/Hardware/Onekey/OnekeyHardwareVerify';
import { OnekeyHardwareModalRoutes } from '../../routesEnum';

export type OnekeyHardwareRoutesParams = {
  [OnekeyHardwareModalRoutes.OnekeyHardwareDetailsModal]: {
    walletId: string;
  };
  [OnekeyHardwareModalRoutes.OnekeyHardwareVerifyModal]: {
    walletId: string;
  };
  [OnekeyHardwareModalRoutes.OnekeyHardwareConnectModal]: {
    deviceId?: string;
    connectId?: string;
    onHandler?: () => Promise<any>;
  };
  [OnekeyHardwareModalRoutes.OnekeyHardwarePinCodeModal]: {
    type: string | null | undefined;
  };
  [OnekeyHardwareModalRoutes.OnekeyHardwareConfirmModal]: {
    type: string | null | undefined;
  };
  [OnekeyHardwareModalRoutes.OnekeyHardwareDeviceNameModal]: {
    walletId: string;
    deviceName: string;
  };
  [OnekeyHardwareModalRoutes.OnekeyDeviceWalletNameModal]: {
    walletId: string;
  };
  [OnekeyHardwareModalRoutes.OnekeyHardwareHomeScreenModal]: {
    walletId: string;
    deviceType: IOneKeyDeviceType;
  };
};

const OnekeyHardwareNavigator =
  createStackNavigator<OnekeyHardwareRoutesParams>();

const modalRoutes = [
  {
    name: OnekeyHardwareModalRoutes.OnekeyHardwareDetailsModal,
    component: OnekeyHardwareDetails,
  },
  {
    name: OnekeyHardwareModalRoutes.OnekeyHardwareVerifyModal,
    component: OnekeyHardwareVerify,
  },
  {
    name: OnekeyHardwareModalRoutes.OnekeyHardwareConnectModal,
    component: OnekeyHardwareConnect,
  },
  {
    name: OnekeyHardwareModalRoutes.OnekeyHardwarePinCodeModal,
    component: OnekeyHardwarePinCode,
  },
  {
    name: OnekeyHardwareModalRoutes.OnekeyHardwareConfirmModal,
    component: OnekeyHardwareConfirm,
  },
  {
    name: OnekeyHardwareModalRoutes.OnekeyHardwareDeviceNameModal,
    component: OnekeyHardwareDeviceName,
  },
  {
    name: OnekeyHardwareModalRoutes.OnekeyHardwareHomeScreenModal,
    component: OnekeyHardwareHomescreen,
  },
  {
    name: OnekeyHardwareModalRoutes.OnekeyDeviceWalletNameModal,
    component: OnekeyDeviceWalletName,
  },
];

const OnekeyHardwareModalStack = () => {
  const isVerticalLayout = useIsVerticalLayout();
  return (
    <OnekeyHardwareNavigator.Navigator
      screenOptions={(navInfo) => ({
        headerShown: false,
        ...makeModalStackNavigatorOptions({ isVerticalLayout, navInfo }),
      })}
    >
      {modalRoutes.map((route) => (
        <OnekeyHardwareNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </OnekeyHardwareNavigator.Navigator>
  );
};

export default OnekeyHardwareModalStack;
