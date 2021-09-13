import React, {useCallback, useContext} from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import {IconButton} from 'react-native-paper';
import {useRaceContext} from '../../store/RaceContext';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import {LocalizationContext} from '../translations/LocalizationContext';
import {ReducerActions} from '../../store/StoreReducer';
import RaceServer from '../server/RaceServer';
import RaceComponent from '../session/race/RaceComponent';
import {useNavigation} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const Stack = createStackNavigator();

const ServerNavigator: React.FC = () => {
  const [state, dispatch] = useRaceContext();
  const {translations} = useContext(LocalizationContext);
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handleScheduleViewer = useCallback(
    () =>
      dispatch({
        type: ReducerActions.SET_SCHEDULE,
        payload: !state.schedule,
      }),
    [dispatch, state.schedule],
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Raceroom Ranked'}
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <IconButton
              icon={'menu'}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => (
            <IconButton
              icon={'calendar-outline'}
              onPress={handleScheduleViewer}
            />
          ),
        }}
      />
      <Stack.Screen
        name={translations.navigation.raceDetails}
        component={RaceServer}
      />
      <Stack.Screen
        name={translations.navigation.driverDetails}
        component={DriverDetailsScreen}
        options={{
          headerRight: () => {
            return state.defaultDriver === state.searchDriver ? (
              <IconButton icon={'account-check'} />
            ) : (
              <IconButton
                icon={'account-plus'}
                onPress={() => {
                  dispatch({
                    type: ReducerActions.SET_DEFAULT_DRIVER,
                    payload: state.searchDriver,
                  });
                }}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={translations.navigation.sessionDetails}
        component={SessionDetailsScreen}
      />
      <Stack.Screen
        name={translations.navigation.race}
        component={RaceComponent}
      />
    </Stack.Navigator>
  );
};

export default ServerNavigator;
