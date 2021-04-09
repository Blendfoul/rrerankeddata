import React, {useContext, useEffect, useState} from 'react';
import {useRaceStore} from './store/RaceContext';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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

const Tab = createBottomTabNavigator();

const App: () => Node = () => {
  const raceStore = useRaceStore();
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getRatings = async () => {
      try {
        const value = await AsyncStorage.getItem('defaultDriver');
        const region = await AsyncStorage.getItem('selectedRegion');

        if (region !== null) {
          raceStore.setRegion(region);
        }
        if (value !== null) {
          raceStore.setDefaultDriver(value);
        }

        const response = await axios('/multiplayer-rating/ratings.json', {
          cancelToken: source.token,
        });

        if (response.status === 200) {
          raceStore.setRatings(response.data);
        }
      } catch (e) {
        console.error('[Ratings] ' + e.message);
      }

      SplashScreen.hide();
    };

    getRatings();

    return () => {
      source.cancel();
    };
  }, [raceStore]);

  useEffect(() => {
    const appStart = async () =>
      initializeAppLanguage().then(() => setLoading(false));

    appStart();
  }, [initializeAppLanguage]);

  return loading ? null : (
    <NavigationContainer linking={RaceLink}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'tomato',
          activeBackgroundColor: '#6f6f6f',
          inactiveBackgroundColor: '#2f2f2f',
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;

            switch (route.name) {
              case translations.navigation.server:
                iconName = 'car';
                break;
              case translations.navigation.user:
                iconName = 'user';
                break;
              case translations.navigation.search:
                iconName = 'search1';
                break;
              case translations.navigation.ranking:
                iconName = 'solution1';
                break;
              case translations.navigation.about:
                iconName = 'team';
                break;
            }

            return (
              <AntIcon
                name={iconName}
                color={focused ? 'white' : 'gray'}
                size={25}
              />
            );
          },
        })}>
        <Tab.Screen
          name={translations.navigation.server}
          component={ServerNavigator}
        />
        <Tab.Screen
          name={translations.navigation.user}
          component={UserNavigator}
        />
        <Tab.Screen
          name={translations.navigation.search}
          component={SearchNavigator}
        />
        <Tab.Screen
          name={translations.navigation.ranking}
          component={RankingNavigator}
        />
        <Tab.Screen
          name={translations.navigation.about}
          component={AboutComponent}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
