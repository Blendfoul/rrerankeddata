import React, {useEffect} from 'react';
import {useRaceStore} from './RaceContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import RaceDetailsScreen from './RaceDetailsScreen';
import axios from 'axios';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';

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
                iconName = 'search';
                break;
              case 'About':
                iconName = 'team';
                break;
            }

            // You can return any component that you like here!
            return <AntIcon name={iconName} color={focused ? 'white' : 'gray'} size={25} />;
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
        <Tab.Screen name="Search" component={UserNavigator} />
        <Tab.Screen name="About" component={UserNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
