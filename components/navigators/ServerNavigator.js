import React, {useContext} from 'react';
import HomeScreen from '../screens/HomeScreen';
import RaceDetailsScreen from '../screens/RaceDetailsScreen';
import {createStackNavigator} from '@react-navigation/stack';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import {Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useRaceStore} from '../../store/RaceContext';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import {Observer} from 'mobx-react-lite';
import {LocalizationContext} from '../translations/LocalizationContext';

const Stack = createStackNavigator();

const ServerNavigator = () => {
  const raceStore = useRaceStore();
  const {translations} = useContext(LocalizationContext);

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
        name={translations.navigation.raceDetails}
        component={RaceDetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2f2f2f',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name={translations.navigation.driverDetails}
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
                  onPress={() => {
                    raceStore.setDefaultDriver(raceStore.SearchDriver);
                    raceStore.setNotification(true);
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
        name={translations.navigation.sessionDetails}
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
