import { createDrawerNavigator } from '@react-navigation/drawer';

import AboutStack from './AboutStack';
import DonateStack from './DonateStack';
import FriendsStack from './FriendsStack';
import RankingStack from './RankingStack';
import SearchStack from './SearchStack';
import ServerStack from './ServerStack';
import UserStack from './UserStack';
import DrawerComponent from '../components/drawer/DrawerComponent';
import { DrawerRoutes, DrawerStackList } from '../models/navigation/Navigation';
import { DrawerWrapperComponent } from './Utils';
import { createStaticNavigation } from '@react-navigation/native';

const DrawerStack = createDrawerNavigator<DrawerStackList>({
  initialRouteName: DrawerRoutes.SERVER,
  screens: {
    [DrawerRoutes.SERVER]: ServerStack,
    [DrawerRoutes.USER]: UserStack,
    [DrawerRoutes.SEARCH]: SearchStack,
    [DrawerRoutes.FRIENDS]: FriendsStack,
    [DrawerRoutes.ABOUT]: AboutStack,
    [DrawerRoutes.DONATE]: DonateStack,
    [DrawerRoutes.RANKING]: RankingStack,
  },
  drawerContent: DrawerComponent,
  layout: DrawerWrapperComponent,
  screenOptions: {
    headerShown: false,
  },
});

const Navigation = createStaticNavigation(DrawerStack);

export default Navigation;
