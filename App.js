import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useRaceStore} from './store/RaceContext';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import AntIcon from 'react-native-vector-icons/AntDesign';
import ServerNavigator from './components/navigators/ServerNavigator';
import SearchNavigator from './components/navigators/SearchNavigator';
import AboutComponent from './components/navigators/AboutComponent';
import UserNavigator from './components/navigators/UserNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import RankingNavigator from './components/navigators/RankingNavigator';
import RaceLink from './RaceLink';
import {LocalizationContext} from './components/translations/LocalizationContext';
import {View, Text} from 'react-native';
import {styles} from './components/utils/Theme';
import {useNetInfo} from '@react-native-community/netinfo';
import TextContainer from './components/utils/TextContainer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './components/drawer/DrawerContent';
import FriendsNavigator from './components/navigators/FriendsNavigator';
import SettingsComponent from './components/navigators/SettingsComponent';

const drawerNavigator = createDrawerNavigator();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const App: () => Node = () => {
  const raceStore = useRaceStore();
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  const [loading, setLoading] = useState(true);
  const isConnected = useNetInfo();

  const getRatings = useCallback(async () => {
    const source = axios.CancelToken.source();
    try {
      const value = await AsyncStorage.getItem('defaultDriver');
      const region = await AsyncStorage.getItem('selectedRegion');

      if (region !== null) {
        raceStore.setRegion(region);
      }
      if (value !== null) {
        console.log(value);
        raceStore.setDefaultDriver(value);
      }
    } catch (e) {
      console.error('[Ratings] ' + e.message);
    }

    return () => {
      source.cancel();
    };
  }, [raceStore]);

  useEffect(() => {
    getRatings();
    SplashScreen.hide();
  }, [raceStore, isConnected.isConnected, getRatings]);

  useEffect(() => {
    const appStart = async () =>
      initializeAppLanguage().then(() => setLoading(false));

    appStart();
  }, [initializeAppLanguage]);

  return loading ? null : !isConnected.isConnected ? (
    <View style={styles.loadingContainer}>
      <TextContainer
        title={<AntIcon name={'exclamation'} size={100} color={'#fff'} />}
        text={translations.noConnection}
      />
    </View>
  ) : (
    <NavigationContainer linking={RaceLink}>
      <drawerNavigator.Navigator
        drawerContent={props => <DrawerContent {...props} />}>
        <drawerNavigator.Screen
          name={translations.navigation.server}
          component={ServerNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.user}
          component={UserNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.search}
          component={SearchNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.ranking}
          component={RankingNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.friends}
          component={FriendsNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.settings}
          component={SettingsComponent}
        />
        <drawerNavigator.Screen
          name={translations.navigation.about}
          component={AboutComponent}
        />
      </drawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
