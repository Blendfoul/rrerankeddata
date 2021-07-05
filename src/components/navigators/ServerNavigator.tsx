import React, {useContext} from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import {Button, useTheme} from 'react-native-paper';
import {useRaceContext} from '../../store/RaceContext';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import {LocalizationContext} from '../translations/LocalizationContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ReducerActions} from '../../store/StoreReducer';
import RaceServer from '../server/RaceServer';
import RaceComponent from '../session/race/RaceComponent';

const Stack = createStackNavigator();

interface ServerNavigatorProps {
  navigation: DrawerNavigationProp<any>;
}

const ServerNavigator: React.FC<ServerNavigatorProps> = ({navigation}) => {
  const [state, dispatch] = useRaceContext();
  const {colors} = useTheme();
  const {translations} = useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Raceroom Ranked'}
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Button onPress={() => navigation.toggleDrawer()}>
              <Icon name="menu" size={25} color="white" />
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name={translations.navigation.raceDetails}
        component={RaceServer}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.text,
        }}
      />
      <Stack.Screen
        name={translations.navigation.driverDetails}
        component={DriverDetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.text,
          headerRight: () => (
            <Button
              onPress={() => {
                dispatch({
                  type: ReducerActions.SET_DEFAULT_DRIVER,
                  payload: state.searchDriver,
                });
              }}>
              <Icon name="person-add" size={25} color="white" />
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name={translations.navigation.sessionDetails}
        component={SessionDetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.text,
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

export default ServerNavigator;
