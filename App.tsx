import React, {useCallback, useContext, useEffect} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import ServerNavigator from './src/components/navigators/ServerNavigator';
import RaceLink from './RaceLink';
import {LocalizationContext} from './src/components/translations/LocalizationContext';
import {View} from 'react-native';
import {styles} from './src/components/utils/Theme';
import TextContainer from './src/components/utils/TextContainer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './src/components/drawer/DrawerContent';
import UserNavigator from './src/components/navigators/UserNavigator';
import SearchNavigator from './src/components/navigators/SearchNavigator';
import AboutNavigator from './src/components/navigators/AboutNavigator';
import FriendsNavigator from './src/components/navigators/FriendsNavigator';
import RankingNavigator from './src/components/navigators/RankingNavigator';
import useInitApp from './src/hooks/useInitApp';
import DonateNavigator from './src/components/navigators/DonateNavigator';
import {
  Provider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {useRaceContext} from './src/store/RaceContext';
import {useFlipper} from '@react-navigation/devtools';
import {DrawerStackList} from './src/types/NavigatorProps';

const CustomDefaultTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: 'transparent',
    error: 'rebeccapurple',
    accent: '#CC2328',
  },
};

const CustomDarkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: 'transparent',
    error: 'rebeccapurple',
    accent: '#CC2328',
  },
};

const RnDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#4f4f4f',
  },
};

const drawerNavigator = createDrawerNavigator<DrawerStackList>();

const App: React.FC = () => {
  const navigationRef = useNavigationContainerRef<DrawerStackList>();

  useFlipper(navigationRef);

  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  const {loading, isConnected} = useInitApp();
  const [state] = useRaceContext();

  const appStart = useCallback(async () => {
    await initializeAppLanguage();
  }, [initializeAppLanguage]);

  useEffect(() => {
    appStart();
  }, [appStart]);

  if (loading) {
    return null;
  }

  if (!isConnected) {
    return (
      <View style={styles.loadingContainer}>
        <TextContainer
          title={<Icon name={'exclamation'} size={100} />}
          text={translations.noConnection}
        />
      </View>
    );
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={RaceLink}
      theme={state.theme === 'dark' ? RnDarkTheme : DefaultTheme}>
      <Provider
        theme={state.theme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}>
        <drawerNavigator.Navigator
          screenOptions={{
            headerShown: false,
          }}
          drawerContent={props => <DrawerContent {...props} />}>
          <drawerNavigator.Screen name={'home'} component={ServerNavigator} />
          <drawerNavigator.Screen name={'user'} component={UserNavigator} />
          <drawerNavigator.Screen
            name={'searchDrawer'}
            component={SearchNavigator}
          />
          <drawerNavigator.Screen
            name={'friends'}
            component={FriendsNavigator}
          />
          <drawerNavigator.Screen
            name={'ranking'}
            component={RankingNavigator}
          />
          <drawerNavigator.Screen name={'about'} component={AboutNavigator} />
          <drawerNavigator.Screen name={'donate'} component={DonateNavigator} />
        </drawerNavigator.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
