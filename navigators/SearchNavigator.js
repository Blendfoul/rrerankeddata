import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../SearchScreen';
import DriverDetailsScreen from '../DriverDetailsScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-elements';
import {useRaceStore} from '../store/RaceContext';
import {ToastAndroid} from 'react-native';
import SessionDetailsScreen from '../SessionDetailsScreen';
import {Observer} from 'mobx-react-lite';

const Stack = createStackNavigator();

const SearchNavigator = ({route, navigation}) => {
  const raceStore = useRaceStore();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Search'}
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Details'}
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

export default SearchNavigator;
