import React from 'react';
import HomeScreen from '../HomeScreen';
import RaceDetailsScreen from '../RaceDetailsScreen';
import {createStackNavigator} from '@react-navigation/stack';
import DriverDetailsScreen from '../DriverDetailsScreen';
import {Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ToastAndroid} from 'react-native';
import {useRaceStore} from '../store/RaceContext';
import SessionDetailsScreen from '../SessionDetailsScreen';
import {Observer} from 'mobx-react-lite';

const Stack = createStackNavigator();

const ServerNavigator = () => {
  const raceStore = useRaceStore();

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
          headerRight: props => (
            <Observer>
              {() => (
                <Button
                  icon={<AntDesign name="adduser" size={25} color="white" />}
                  title=""
                  onPress={() => {
                    raceStore.setDefaultDriver(raceStore.SearchDriver);
                    ToastAndroid.show(
                      'Default driver set!',
                      ToastAndroid.SHORT,
                    );
                  }}
                  style={{marginHorizontal: 10}}
                  type={'clear'}
                />
              )}
            </Observer>
          ),
        }}
      />
      <Stack.Screen
        name={'Session Details'}
        component={SessionDetailsScreen}
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
