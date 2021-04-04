import React, {useEffect} from 'react';
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
import {navigation} from './assets/strings/en.json';

const Tab = createBottomTabNavigator();

const App: () => Node = () => {
  const raceStore = useRaceStore();

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

        const response = await axios(
          'https://game.raceroom.com/multiplayer-rating/ratings.json',
          {cancelToken: source.token},
        );

        if (response.status === 200) {
          raceStore.setRatings(response.data);
        }
      } catch (e) {
        console.error('[Ratings] ' + e.message);
      }
    };

    getRatings();
    SplashScreen.hide();

    return () => {
      source.cancel();
    };
  }, [raceStore]);

  return (
    <NavigationContainer linking={RaceLink}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'tomato',
          activeBackgroundColor: '#6f6f6f',
          inactiveBackgroundColor: '#2f2f2f',
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
              case 'Servers':
                iconName = 'car';
                break;
              case 'User':
                iconName = 'user';
                break;
              case 'Search':
                iconName = 'search1';
                break;
              case 'Ranking':
                iconName = 'solution1';
                break;
              case 'About':
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
        <Tab.Screen name={navigation.server} component={ServerNavigator} />
        <Tab.Screen name={navigation.user} component={UserNavigator} />
        <Tab.Screen name={navigation.search} component={SearchNavigator} />
        <Tab.Screen name={navigation.ranking} component={RankingNavigator} />
        <Tab.Screen name={navigation.about} component={AboutComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
