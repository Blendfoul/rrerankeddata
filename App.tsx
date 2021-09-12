import React, {useCallback, useContext, useEffect} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import ServerNavigator from './src/components/navigators/ServerNavigator';
import RaceLink from './RaceLink';
import {LocalizationContext} from './src/components/translations/LocalizationContext';
import {useColorScheme, View} from 'react-native';
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

const CustomDefaultTheme: ReactNativePaper.Theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: 'transparent',
    accent: '#CC2328',
  },
};

const CustomDarkTheme: ReactNativePaper.Theme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: 'transparent',
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

const drawerNavigator = createDrawerNavigator();

const App: React.FC<any> = () => {
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
    <Provider
      theme={state.theme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}>
      <NavigationContainer
        linking={RaceLink}
        theme={state.theme === 'dark' ? RnDarkTheme : DefaultTheme}>
        <drawerNavigator.Navigator
          screenOptions={{
            headerShown: false,
          }}
          drawerContent={props => <DrawerContent {...props} />}>
          <drawerNavigator.Screen
            name={`${translations.navigation.server}-drawer`}
            component={ServerNavigator}
          />
          <drawerNavigator.Screen
            name={`${translations.navigation.user}-drawer`}
            component={UserNavigator}
          />
          <drawerNavigator.Screen
            name={`${translations.navigation.search}-drawer`}
            component={SearchNavigator}
          />
          <drawerNavigator.Screen
            name={`${translations.navigation.friends}-drawer`}
            component={FriendsNavigator}
          />
          <drawerNavigator.Screen
            name={`${translations.navigation.ranking}-drawer`}
            component={RankingNavigator}
          />
          <drawerNavigator.Screen
            name={`${translations.navigation.about}-drawer`}
            component={AboutNavigator}
          />
          <drawerNavigator.Screen
            name={`${translations.navigation.donate}-drawer`}
            component={DonateNavigator}
          />
        </drawerNavigator.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

/*

          <drawerNavigator.Screen
            name={`${translations.navigation.settings}-drawer`}
            component={SettingsNavigator}
          />
 */
