import { useIsVerticalLayout } from '@onekeyhq/components';
import {
  createStackNavigator,
  makeModalStackNavigatorOptions,
} from '@onekeyhq/components/src/Navigation';
import type { Collection, INFTAsset } from '@onekeyhq/engine/src/types/nft';

import CollectionModalView from '../../../views/Wallet/NFT/CollectionModal';
import NFTDetailView from '../../../views/Wallet/NFT/NFTDetail';
import { CollectiblesModalRoutes } from '../../routesEnum';

import type { ModalRoutesType } from './types';

export type CollectiblesRoutesParams = {
  [CollectiblesModalRoutes.CollectionModal]: {
    collectible: Collection;
    networkId: string;
    accountId: string;
  };
  [CollectiblesModalRoutes.NFTDetailModal]: {
    asset: INFTAsset;
    isOwner: boolean;
    networkId: string;
    accountId?: string;
    onRecycleUtxo?: () => void;
  };
};

const CollectibleNavigator = createStackNavigator<CollectiblesRoutesParams>();

const modalRoutes: ModalRoutesType<CollectiblesModalRoutes> = [
  {
    name: CollectiblesModalRoutes.CollectionModal,
    component: CollectionModalView,
  },
  {
    name: CollectiblesModalRoutes.NFTDetailModal,
    component: NFTDetailView,
  },
];

const CollectibleModalStack = () => {
  const isVerticalLayout = useIsVerticalLayout();
  return (
    <CollectibleNavigator.Navigator
      screenOptions={(navInfo) => ({
        headerShown: false,
        ...makeModalStackNavigatorOptions({ isVerticalLayout, navInfo }),
      })}
    >
      {modalRoutes.map((route) => (
        <CollectibleNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </CollectibleNavigator.Navigator>
  );
};

export default CollectibleModalStack;
