
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getI18n } from 'react-i18next';

import { RankingRoutes, RankingStackList } from '../models/navigation/Navigation';
import RankingScreen from '../screens/RankingScreen';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import SessionScreen from '../screens/SessionScreen';
import UserScreen from '../screens/UserScreen';
import { HeaderRight, MenuHeader } from './Utils';

const { t } = getI18n();

const RankingStack = createNativeStackNavigator<RankingStackList>({
  screens: {
    [RankingRoutes.RANKING]: {
      screen: RankingScreen,
      options: {
        title: t('drawer.ranking'),
        headerLeft: MenuHeader,
      },
    },
    [RankingRoutes.USER]: {
      screen: UserScreen,
      options: {
        headerRight: HeaderRight,
      },
    },
    [RankingRoutes.RESULT]: {
      screen: SessionScreen,
      options: {
        title: t('drawer.result'),
      },
    },
    [RankingRoutes.DETAILS]: {
      screen: SessionDetailsScreen,
      options: {
        title: t('drawer.details'),
      },
    },
  },
});

export default RankingStack;
