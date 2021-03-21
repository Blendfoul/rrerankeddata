import React, {useEffect} from 'react';
import {useRaceStore} from './RaceContext';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import ServerNavigator from './ServerNavigator';
import SearchNavigator from './SearchNavigator';

const Tab = createBottomTabNavigator();

function UserNavigator() {
  return null;
}

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
    getRatings();

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
                iconName = 'info';
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
        <Tab.Screen
          name="Servers"
          component={ServerNavigator}
          options={{
            headerStyle: {
              backgroundColor: '#2f2f2f',
            },
            headerTintColor: '#fff',
          }}
        />
        <Tab.Screen name="User" component={UserNavigator} />
        <Tab.Screen name="Search" component={SearchNavigator} />
        <Tab.Screen name="About" component={UserNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
