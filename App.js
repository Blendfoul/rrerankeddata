import React, {useEffect} from 'react';
import {useRaceStore} from './RaceContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import RaceDetailsScreen from './RaceDetailsScreen';
import axios from 'axios';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ServerNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Raceroom Ranked'}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Race Details'}
        component={RaceDetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2f2f2f',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

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
          activeTintColor: 'gray',
          inactiveTintColor: 'tomato',
          activeBackgroundColor: '#2f2f2f',
          inactiveBackgroundColor: '#2f2f2f',
        }}>
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
