import React, {useCallback, useContext} from 'react';
import HomeScreen from '../screens/HomeScreen';
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
import {RaceStackList} from '../../types/NavigatorProps';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RaceStackList>();

const ServerNavigator: React.FC = () => {
  const [state, dispatch] = useRaceContext();
  const {translations} = useContext(LocalizationContext);
  const navigation =
    useNavigation<DrawerNavigationProp<RaceStackList, 'race'>>();

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
        name={'raceViewer'}
        component={HomeScreen}
        options={{
          title: 'Raceroom Ranked',
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
        name={'raceDetails'}
        options={{
          title: translations.navigation.raceDetails,
        }}
        component={RaceServer}
      />
      <Stack.Screen
        name={'driverDetails'}
        component={DriverDetailsScreen}
        options={{
          title: translations.navigation.driverDetails,
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
        name={'sessionDetails'}
        options={{
          title: translations.navigation.sessionDetails,
        }}
        component={SessionDetailsScreen}
      />
      <Stack.Screen
        name={'race'}
        options={{
          title: translations.navigation.race,
        }}
        component={RaceComponent}
      />
    </Stack.Navigator>
  );
};

export default ServerNavigator;
