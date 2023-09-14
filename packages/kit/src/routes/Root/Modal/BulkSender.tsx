import { useIsVerticalLayout } from '@onekeyhq/components';
import { createStackNavigator } from '@onekeyhq/components/src/Navigation';

import { AmountEditor } from '../../../views/BulkSender/AmountEditor';
import { IntervalEditor } from '../../../views/BulkSender/IntervalEditor';
import { TokenSelectorModal } from '../../../views/BulkSender/TokenSelector';
import { BulkSenderRoutes } from '../../../views/BulkSender/types';

import type { BulkSenderRoutesParams } from '../../../views/BulkSender/types';

const BulkSenderNavigator = createStackNavigator<BulkSenderRoutesParams>();

const modalRoutes = [
  {
    name: BulkSenderRoutes.TokenSelector,
    component: TokenSelectorModal,
  },
  {
    name: BulkSenderRoutes.AmountEditor,
    component: AmountEditor,
  },
  {
    name: BulkSenderRoutes.IntervalEditor,
    component: IntervalEditor,
  },
];

const BulkSenderModalStack = () => {
  const isVerticalLayout = useIsVerticalLayout();
  return (
    <BulkSenderNavigator.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: !!isVerticalLayout,
      }}
    >
      {modalRoutes.map((route) => (
        <BulkSenderNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </BulkSenderNavigator.Navigator>
  );
};

export default BulkSenderModalStack;
export type { BulkSenderRoutesParams };
