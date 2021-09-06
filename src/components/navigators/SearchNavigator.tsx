import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import {Button, IconButton} from 'react-native-paper';
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
          headerLeft: () => (
            <IconButton
              icon={'menu'}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name={translations.search.title.details}
        component={DriverDetailsScreen}
        options={{
          headerRight: () => (
            <IconButton
              icon={'account-plus'}
              onPress={() => {
                dispatch({
                  type: ReducerActions.SET_DEFAULT_DRIVER,
                  payload: state.searchDriver,
                });
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={translations.search.title.sessionDetails}
        component={SessionDetailsScreen}
      />
      <Stack.Screen
        name={translations.navigation.race}
        component={RaceComponent}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
