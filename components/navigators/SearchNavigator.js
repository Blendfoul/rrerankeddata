import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-elements';
import {useRaceStore} from '../../store/RaceContext';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import {Observer} from 'mobx-react-lite';
import {LocalizationContext} from '../translations/LocalizationContext';

const Stack = createStackNavigator();

const SearchNavigator = ({route, navigation}) => {
  const raceStore = useRaceStore();
  const {translations} = useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.search.title.search}
        component={SearchScreen}
        initialParams={{id: route?.params?.id}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={translations.search.title.details}
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
        name={translations.search.title.sessionDetails}
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
