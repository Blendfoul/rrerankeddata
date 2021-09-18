import React, {useContext} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import {IconButton} from 'react-native-paper';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import {LocalizationContext} from '../translations/LocalizationContext';
import {useNavigation, useRoute} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';
import RaceComponent from '../session/race/RaceComponent';
import {DrawerStackList, SearchStackList} from '../../types/NavigatorProps';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<SearchStackList>();

type Props = StackNavigationProp<SearchStackList, 'search'>;

const SearchNavigator: React.FC = () => {
  const [state, dispatch] = useRaceContext();
  const {translations} = useContext(LocalizationContext);
  // @ts-ignore
  const {params} = useRoute<Props['route']>();
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackList>>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'search'}
        component={SearchScreen}
        initialParams={{id: params?.id}}
        options={{
          title: translations.search.title.search,
          headerLeft: () => (
            <IconButton
              icon={'menu'}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name={'driverDetails'}
        component={DriverDetailsScreen}
        options={{
          title: translations.search.title.details,
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
          title: translations.search.title.sessionDetails,
        }}
        component={SessionDetailsScreen}
      />
      <Stack.Screen
        name={'raceHistory'}
        options={{
          title: translations.navigation.race,
        }}
        component={RaceComponent}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
