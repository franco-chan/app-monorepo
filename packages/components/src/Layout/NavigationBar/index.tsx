import DesktopLeftSideBar from './DesktopLeftSideBar';
import MobileBottomTabBar from './MobileBottomTabBar';

import type { BottomTabBarProps } from '../BottomTabs';

export type NavigationBarProps = BottomTabBarProps & {
  isVerticalLayout: boolean;
};

export default function NavigationBar({
  isVerticalLayout,
  ...props
}: NavigationBarProps) {
  if (isVerticalLayout) {
    return <MobileBottomTabBar {...props} />;
  }
  return <DesktopLeftSideBar {...props} />;
}
