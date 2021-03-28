import React, {useEffect} from 'react';
import {useRaceStore} from './store/RaceContext';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import ServerNavigator from './navigators/ServerNavigator';
import SearchNavigator from './navigators/SearchNavigator';
import AboutComponent from './navigators/AboutComponent';
import UserNavigator from './navigators/UserNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import RaceTheme from './Theme';

const Tab = createBottomTabNavigator();

const App: () => Node = () => {
  const raceStore = useRaceStore();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getRatings = async () => {
      try {
        const response = await axios(
          'https://game.raceroom.com/multiplayer-rating/ratings.json',
          {cancelToken: source.token},
        );

        if (response.status === 200) {
          raceStore.setRatings(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('defaultDriver');
        if (value !== null) {
          raceStore.setDefaultDriver(value);
        }

        const region = await AsyncStorage.getItem('selectedRegion');
        if (region !== null) {
          raceStore.setRegion(region);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getRatings();
    getData();
    SplashScreen.hide();
    return () => {
      source.cancel();
    };
  }, [raceStore]);

  return (
    <NavigationContainer>
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
        <Tab.Screen name="Servers" component={ServerNavigator} />
        <Tab.Screen name="User" component={UserNavigator} />
        <Tab.Screen name="Search" component={SearchNavigator} />
        <Tab.Screen name="About" component={AboutComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
