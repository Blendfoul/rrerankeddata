
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getI18n } from 'react-i18next';

import { SearchRoutes, SearchStackList } from '../models/navigation/Navigation';
import SearchScreen from '../screens/SearchScreen';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import SessionScreen from '../screens/SessionScreen';
import UserScreen from '../screens/UserScreen';
import { MenuHeader, HeaderRight } from './Utils';

const { t } = getI18n();

const SearchStack = createNativeStackNavigator<SearchStackList>({
  screens: {
    [SearchRoutes.SEARCH]: {
      screen: SearchScreen,
      options: {
        title: t('drawer.search'),
        headerLeft: MenuHeader,
      },
    },
    [SearchRoutes.USER]: {
      screen: UserScreen,
      options: {
        headerRight: HeaderRight,
      },
    },
    [SearchRoutes.RESULT]: {
      screen: SessionScreen,
      options: {
        title: t('drawer.result'),
      },
    },
    [SearchRoutes.DETAILS]: {
      screen: SessionDetailsScreen,
      options: {
        title: t('drawer.details'),
      },
    },
  }
});

export default SearchStack;
