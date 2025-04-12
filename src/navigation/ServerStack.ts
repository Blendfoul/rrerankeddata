
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getI18n } from 'react-i18next';

import CalendarComponent from '../components/calendar/CalendarComponent';
import { ServerRoutes, ServerStackList } from '../models/navigation/Navigation';
import HomeScreen from '../screens/HomeScreen';
import ServerScreen from '../screens/ServerScreen';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import SessionScreen from '../screens/SessionScreen';
import UserScreen from '../screens/UserScreen';
import { HeaderRight, MenuHeader, ScheduleHeader } from './Utils';

const { t } = getI18n();

const ServerStack = createNativeStackNavigator<ServerStackList>({
  screens: {
    [ServerRoutes.HOME]: {
      screen: HomeScreen,
      options: {
        title: t('drawer.server'),
        headerLeft: MenuHeader,
        headerRight: ScheduleHeader,
      },
    },
    [ServerRoutes.SERVER]: {
      screen: ServerScreen,
    },
    [ServerRoutes.USER]: {
      screen: UserScreen,
      options: {
        headerRight: HeaderRight,
      }
    },
    [ServerRoutes.RESULT]: {
      screen: SessionScreen,
      options: {
        title: t('drawer.result'),
      },
    },
    [ServerRoutes.DETAILS]: {
      screen: SessionDetailsScreen,
      options: {
        title: t('drawer.details'),
      },
    },
    [ServerRoutes.SCHEDULE]: {
      screen: CalendarComponent,
      options: {
        title: t('drawer.schedule'),
      },
    }
  },
});

export default ServerStack;
