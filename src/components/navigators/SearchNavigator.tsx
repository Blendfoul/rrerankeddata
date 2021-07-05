import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import {Button} from 'react-native-paper';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import {LocalizationContext} from '../translations/LocalizationContext';
import {RouteProp} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';
import RaceComponent from '../session/race/RaceComponent';

const Stack = createStackNavigator();

interface SearchProps {
  route: RouteProp<any, any>;
  navigation: DrawerNavigationProp<any>;
}

const SearchNavigator: React.FC<SearchProps> = ({route, navigation}) => {
  const [state, dispatch] = useRaceContext();
  const {translations} = useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.search.title.search}
        component={SearchScreen}
        initialParams={{id: route?.params?.id}}
        options={{
          headerStyle: {
            backgroundColor: '#2f2f2f',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <Button onPress={() => navigation.toggleDrawer()}>
              <Icon name="menu" size={25} color="white" />
            </Button>
          ),
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
          headerRight: () => (
            <Button
              onPress={() => {
                dispatch({
                  type: ReducerActions.SET_DEFAULT_DRIVER,
                  payload: state.searchDriver,
                });
              }}>
              <Icon name="account-plus" size={25} color="white" />
            </Button>
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
      <Stack.Screen
        name={translations.navigation.race}
        component={RaceComponent}
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
