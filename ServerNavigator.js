import React from 'react';
import HomeScreen from './HomeScreen';
import RaceDetailsScreen from './RaceDetailsScreen';
import {createStackNavigator} from '@react-navigation/stack';
import DriverDetailsScreen from './DriverDetailsScreen';

const Stack = createStackNavigator();

const ServerNavigator = () => {
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
      <Stack.Screen
        name={'Driver Details'}
        component={DriverDetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2f2f2f',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default ServerNavigator;
