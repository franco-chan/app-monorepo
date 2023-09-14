/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useMemo } from 'react';

import { CommonActions } from '@react-navigation/native';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

import { Text, useUserDevice } from '@onekeyhq/components';
import { PortalContainer } from '@onekeyhq/kit/src/views/Overlay/RootPortal';
import PlatformEnv from '@onekeyhq/shared/src/platformEnv';

import Box from '../../Box';
import Icon from '../../Icon';
import Pressable from '../../Pressable';
import useIsKeyboardShown from '../BottomTabs/utils/useIsKeyboardShown';

import type { ICON_NAMES } from '../../Icon';
import type { DeviceState } from '../../Provider/device';
import type { BottomTabBarProps } from '../BottomTabs';
import type { Animated, StyleProp, ViewStyle } from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';

const DEFAULT_TABBAR_HEIGHT = 49;
const COMPACT_TABBAR_HEIGHT = 32;
const useNativeDriver = !!PlatformEnv.isNative;

type Options = {
  deviceSize: DeviceState['size'];
  dimensions?: { height: number; width: number };
};

const shouldUseHorizontalLabels = ({ deviceSize }: Options) =>
  ['NORMAL'].includes(deviceSize);

const getPaddingBottom = (insets: EdgeInsets) =>
  Math.max(insets.bottom - Platform.select({ ios: 4, default: 0 }), 0);

export const getTabBarHeight = ({
  dimensions,
  insets,
  style,
  deviceSize,
}: Options & {
  insets: EdgeInsets;
  style: Animated.WithAnimatedValue<StyleProp<ViewStyle>> | undefined;
}) => {
  // @ts-ignore
  const customHeight = StyleSheet.flatten(style)?.height;

  if (typeof customHeight === 'number' && customHeight > 0) {
    return customHeight;
  }

  const isLandscape = dimensions ? dimensions.width > dimensions.height : false;
  const horizontalLabels = shouldUseHorizontalLabels({
    deviceSize,
    dimensions,
  });
  const paddingBottom = getPaddingBottom(insets);

  if (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    isLandscape &&
    horizontalLabels
  ) {
    return COMPACT_TABBAR_HEIGHT + paddingBottom;
  }

  return DEFAULT_TABBAR_HEIGHT + paddingBottom;
};

export type MobileBottomTabBarProps = BottomTabBarProps & {
  backgroundColor?: string;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

export default function MobileBottomTabBar({
  navigation,
  state,
  descriptors,
  backgroundColor,
  insets,
  style,
}: MobileBottomTabBarProps) {
  const { size } = useUserDevice();

  const dimensions = useSafeAreaFrame();
  const isKeyboardShown = useIsKeyboardShown();
  const { routes } = state;

  const isHide = isKeyboardShown;

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;

  const { tabBarStyle } = focusedOptions;

  const paddingBottom = getPaddingBottom(insets);
  const tabBarHeight = getTabBarHeight({
    insets,
    dimensions,
    deviceSize: size,
    style: [tabBarStyle, style],
  });

  const horizontal = shouldUseHorizontalLabels({
    deviceSize: size,
  });

  const tabs = useMemo(
    () =>
      routes.map((route, index) => {
        const isActive = index === state.index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.dispatch({
              ...CommonActions.navigate({ name: route.name, merge: true }),
              target: state.key,
            });
          }
        };

        return (
          <Box
            testID="Mobile-AppTabBar-TabItem"
            flex={1}
            px={1}
            py={isHide ? 0 : 1}
            key={route.name}
            backgroundColor={backgroundColor}
          >
            <Pressable
              testID="Mobile-AppTabBar-TabItem-Icon"
              alignItems="center"
              px={0.5}
              py={isHide ? 0 : 1.5}
              mb={isHide ? 0 : 4}
              onPress={onPress}
              _hover={{ bg: 'surface-hovered' }}
              rounded="xl"
              justifyContent="center"
              key={route.name}
              style={
                horizontal
                  ? {
                      flexDirection: 'row',
                    }
                  : {
                      flexDirection: 'column',
                    }
              }
            >
              <Icon
                // @ts-expect-error
                name={options?.tabBarIcon?.(isActive) as ICON_NAMES}
                color={isActive ? 'icon-default' : 'icon-subdued'}
                size={28}
              />
              {useNativeDriver && options?.tabBarLabel?.length ? (
                <Text
                  typography="Caption"
                  color={isActive ? 'text-default' : 'text-subdued'}
                  fontSize={11}
                  numberOfLines={1}
                >
                  {options?.tabBarLabel}
                </Text>
              ) : null}
            </Pressable>
          </Box>
        );
      }),
    [
      backgroundColor,
      descriptors,
      horizontal,
      isHide,
      navigation,
      routes,
      state.index,
      state.key,
    ],
  );
  if (isHide) {
    return null;
  }
  return (
    <Box
      testID="Mobile-AppTabBar"
      borderTopWidth={StyleSheet.hairlineWidth}
      left="0"
      right="0"
      bottom="0"
      bg="background-default"
      zIndex={99999}
      borderTopColor="divider"
      paddingBottom={`${paddingBottom}px`}
      height={isHide ? '0' : tabBarHeight}
      py={isHide ? 0 : Math.max(insets.left ?? 0, insets.right ?? 0)}
    >
      <Box
        testID="Mobile-AppTabBar-Content"
        accessibilityRole="tablist"
        flex="1"
        flexDirection="row"
      >
        {tabs}
      </Box>
      <PortalContainer
        // testID="Mobile-AppTabBar-PortalContainer"
        name={`BottomTab-Overlay-${state.key}`}
      />
    </Box>
  );
}
