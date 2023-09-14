import { useIsVerticalLayout } from '@onekeyhq/components';
import {
  createStackNavigator,
  makeModalStackNavigatorOptions,
} from '@onekeyhq/components/src/Navigation';

import { NetworkAccountSelectorModal } from '../../../components/NetworkAccountSelector';
import { NetworkSelectorModal } from '../../../components/NetworkAccountSelector/modals/NetworkSelectorModal/NetworkSelectorModal';
import { AddNetwork } from '../../../views/ManageNetworks/AddNetwork';
import { AddNetworkConfirm } from '../../../views/ManageNetworks/AddNetwork/AddNetworkConfirm';
import { AllNetworksAccountsDetail } from '../../../views/ManageNetworks/AllNetworks/AllNetworksAccountsDetail';
import { AllNetworksNetworkSelectorModal } from '../../../views/ManageNetworks/AllNetworks/NetworksSelectorModal';
import { CustomNetwork } from '../../../views/ManageNetworks/CustomNetwork';
import { Listing } from '../../../views/ManageNetworks/Listing';
import { SortableView } from '../../../views/ManageNetworks/Listing/SortableView';
import { PresetNetwork } from '../../../views/ManageNetworks/PresetNetwork';
import { ManageNetworkQuickAdd } from '../../../views/ManageNetworks/QuickAdd';
import { ManageNetworkRPCNode } from '../../../views/ManageNetworks/RPCNode';
import { SwitchNetwork } from '../../../views/ManageNetworks/SwitchNetwork';
import { SwitchRpcModal } from '../../../views/ManageNetworks/SwitchRpc';
import { ManageNetworkModalRoutes } from '../../../views/ManageNetworks/types';

import type { ManageNetworkRoutesParams } from '../../../views/ManageNetworks/types';
import type { ModalRoutesType } from './types';

const ManageNetworkNavigator =
  createStackNavigator<ManageNetworkRoutesParams>();

const modalRoutes: ModalRoutesType<ManageNetworkModalRoutes> = [
  {
    name: ManageNetworkModalRoutes.NetworkAccountSelector,
    component: NetworkAccountSelectorModal,
  },
  {
    name: ManageNetworkModalRoutes.NetworkSelector,
    component: NetworkSelectorModal,
  },
  {
    name: ManageNetworkModalRoutes.Listing,
    component: Listing,
  },
  {
    name: ManageNetworkModalRoutes.AddNetwork,
    component: AddNetwork,
  },
  {
    name: ManageNetworkModalRoutes.CustomNetwork,
    component: CustomNetwork,
  },
  {
    name: ManageNetworkModalRoutes.PresetNetwork,
    component: PresetNetwork,
  },
  {
    name: ManageNetworkModalRoutes.AddNetworkConfirm,
    component: AddNetworkConfirm,
  },
  {
    name: ManageNetworkModalRoutes.SwitchNetwork,
    component: SwitchNetwork,
  },
  {
    name: ManageNetworkModalRoutes.RPCNode,
    component: ManageNetworkRPCNode,
  },
  {
    name: ManageNetworkModalRoutes.QuickAdd,
    component: ManageNetworkQuickAdd,
  },
  {
    name: ManageNetworkModalRoutes.Sort,
    component: SortableView,
  },
  {
    name: ManageNetworkModalRoutes.SwitchRpc,
    component: SwitchRpcModal,
  },
  {
    name: ManageNetworkModalRoutes.AllNetworksNetworkSelector,
    component: AllNetworksNetworkSelectorModal,
  },
  {
    name: ManageNetworkModalRoutes.AllNetworksAccountsDetail,
    component: AllNetworksAccountsDetail,
  },
];

const ManageNetworkModalStack = () => {
  const isVerticalLayout = useIsVerticalLayout();
  return (
    <ManageNetworkNavigator.Navigator
      screenOptions={(navInfo) => ({
        ...makeModalStackNavigatorOptions({ isVerticalLayout, navInfo }),
      })}
    >
      {modalRoutes.map((route) => (
        <ManageNetworkNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </ManageNetworkNavigator.Navigator>
  );
};

export default ManageNetworkModalStack;
export type { ManageNetworkRoutesParams };
