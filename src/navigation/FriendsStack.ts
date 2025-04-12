
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getI18n } from 'react-i18next';

import FriendsScreen from '../models/navigation/FriendsScreen';
import { FriendsRoutes, FriendsStackList } from '../models/navigation/Navigation';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import SessionScreen from '../screens/SessionScreen';
import UserScreen from '../screens/UserScreen';
import { MenuHeader } from './Utils';

const { t } = getI18n();

const FriendsStack = createNativeStackNavigator<FriendsStackList>({
  initialRouteName: FriendsRoutes.FRIENDS,
  screens: {
    [FriendsRoutes.FRIENDS]: {
      screen: FriendsScreen,
      options: {
        title: t('drawer.friends'),
        headerLeft: MenuHeader,
      },
    },
    [FriendsRoutes.USER]: {
      screen: UserScreen,
    },
    [FriendsRoutes.RESULT]: {
      screen: SessionScreen,
      options: {
        title: t('drawer.result'),
      },
    },
    [FriendsRoutes.DETAILS]: {
      screen: SessionDetailsScreen,
      options: {
        title: t('drawer.details'),
      },
    },
  },
});

export default FriendsStack;
