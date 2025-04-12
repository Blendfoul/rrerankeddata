
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getI18n } from 'react-i18next';

import {
  UserRoutes,
  UserStackList,
} from '../models/navigation/Navigation';
import DefaultUserScreen from '../screens/DefaultUserScreen';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import SessionScreen from '../screens/SessionScreen';
import { MenuHeader, RemoveDefinedUser } from './Utils';

const { t } = getI18n();

const UserStack = createNativeStackNavigator<UserStackList>({
  screens: {
    [UserRoutes.USER]: {
      screen: DefaultUserScreen,
      options: {
        headerLeft: MenuHeader,
        headerRight: RemoveDefinedUser,
      }
    },
    [UserRoutes.RESULT]: {
      screen: SessionScreen,
      options: {
        title: t('drawer.result'),
      },
    },
    [UserRoutes.DETAILS]: {
      screen: SessionDetailsScreen,
    },
  },
});

export default UserStack;
