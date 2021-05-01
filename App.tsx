import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useRaceStore} from './src/store/RaceContext';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import AntIcon from 'react-native-vector-icons/AntDesign';
import ServerNavigator from './src/components/navigators/ServerNavigator';
import SearchNavigator from './src/components/navigators/SearchNavigator';
import UserNavigator from './src/components/navigators/UserNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import RankingNavigator from './src/components/navigators/RankingNavigator';
import RaceLink from './RaceLink';
import {LocalizationContext} from './src/components/translations/LocalizationContext';
import {View} from 'react-native';
import {styles} from './src/components/utils/Theme';
import {useNetInfo} from '@react-native-community/netinfo';
import TextContainer from './src/components/utils/TextContainer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './src/components/drawer/DrawerContent';
import FriendsNavigator from './src/components/navigators/FriendsNavigator';
import AboutNavigator from './src/components/navigators/AboutNavigator';
import LeaderboardNavigator from './src/components/navigators/LeaderboardNavigator';
import './setTextPresets';

const drawerNavigator = createDrawerNavigator();

const App: React.FC<any> = () => {
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
          name={translations.navigation.friends}
          component={FriendsNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.ranking}
          component={RankingNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.leaderboard}
          component={LeaderboardNavigator}
        />
        <drawerNavigator.Screen
          name={translations.navigation.about}
          component={AboutNavigator}
        />
      </drawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;

/*<drawerNavigator.Screen
        name={translations.navigation.settings}
        component={SettingsNavigator}
      />*/
