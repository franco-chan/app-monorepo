/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useMemo } from 'react';

import { useIntl } from 'react-intl';

import { useIsVerticalLayout, useThemeValue } from '@onekeyhq/components';
import { createBottomTabNavigator } from '@onekeyhq/components/src/Layout/BottomTabs';
import NavigationBar from '@onekeyhq/components/src/Layout/NavigationBar';
import { createStackNavigator } from '@onekeyhq/components/src/Navigation';
import { LazyDisplayView } from '@onekeyhq/kit/src/components/LazyDisplayView';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

import { buildAppRootTabName } from '../../../routesUtils';

import { tabRoutes } from './routes/tabRoutes';
import {
  buildTabNavigatorHeaderRender,
  buildTabScreenHeaderRender,
} from './tabNavHeader';

import type { TabRoutes } from '../../../routesEnum';
import type {
  ScreensList,
  TabRouteConfig,
  TabRoutesParams,
} from '../../../types';

const Tab = createBottomTabNavigator<TabRoutesParams>();

const Stack = createStackNavigator();

export const getStackTabScreen = (
  tabName: TabRoutes,
  isVerticalLayout: boolean,
) => {
  const tab = tabRoutes.find((t) => t.name === tabName) as TabRouteConfig;
  const screens: ScreensList<string> = [
    {
      // fix: Found screens with the same name nested inside one another
      name: buildAppRootTabName(tab.name),
      component: tab.component,
      alwaysShowBackButton: false,
      i18nTitle: tab.translationId,
    },
    ...(tab.children || []),
  ];

  const StackNavigatorComponent = () => {
    const [bgColor, borderBottomColor] = useThemeValue([
      'background-default',
      'border-subdued',
    ]);
    return (
      <Stack.Navigator>
        {screens.map(({ name, component, ...stackOptions }, index) => {
          const { headerShown, headerRender } = buildTabScreenHeaderRender({
            tab,
            index,
            name,
            i18nTitle: stackOptions.i18nTitle,
            stackOptions,
            bgColor,
            borderBottomColor,
            isVerticalLayout,
          });

          return (
            // show navigation header
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              options={{
                // @ts-ignore
                key: `${name}.Stack.Screen.component`,
                header: headerRender,
                headerShown,
              }}
            />
          );
        })}
      </Stack.Navigator>
    );
  };

  return StackNavigatorComponent;
};

const TabNavigator = () => {
  const intl = useIntl();
  const isVerticalLayout = useIsVerticalLayout();

  const tabNavigatorHeaderRender = useMemo(
    () => buildTabNavigatorHeaderRender(),
    [],
  );

  const tabRoutesList = useMemo(
    () =>
      tabRoutes.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={getStackTabScreen(tab.name, isVerticalLayout)}
          options={{
            tabBarIcon: tab.tabBarIcon,
            tabBarLabel: intl.formatMessage({ id: tab.translationId }),
            // TODO not working
            tabBarStyle: { display: 'none', height: 0 },
          }}
        />
      )),
    [intl, isVerticalLayout],
  );

  return useMemo(
    () => (
      <LazyDisplayView
        delay={100}
        hideOnUnmount={false}
        isLazyDisabled={platformEnv.isNative}
      >
        <Tab.Navigator
          tabBar={(props) => (
            <NavigationBar isVerticalLayout={isVerticalLayout} {...props} />
          )}
          screenOptions={{
            // TODO make component content lazy
            // FIXME: lazy causes issues with overlays
            header: tabNavigatorHeaderRender,
            freezeOnBlur: true,
            lazy: !platformEnv.isNative,
          }}
        >
          {tabRoutesList}
        </Tab.Navigator>
      </LazyDisplayView>
    ),
    [isVerticalLayout, tabNavigatorHeaderRender, tabRoutesList],
  );
};

export default memo(TabNavigator);
