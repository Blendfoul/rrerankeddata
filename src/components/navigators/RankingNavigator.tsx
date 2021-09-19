import React, {useContext} from 'react';
import {Button, IconButton} from 'react-native-paper';
import {LocalizationContext} from '../translations/LocalizationContext';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';
import RatingScreen from '../screens/RatingScreen';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {DrawerStackList, RankingStackList} from '../../types/NavigatorProps';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RankingStackList>();

const RankingNavigator: React.FC = () => {
  const {translations} = useContext(LocalizationContext);
  const [state, dispatch] = useRaceContext();
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackList>>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'rankingList'}
        component={RatingScreen}
        options={{
          title: translations.navigation.ranking,
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
          headerRight: () => (
            <Button
              onPress={() => {
                dispatch({
                  type: ReducerActions.SET_DEFAULT_DRIVER,
                  payload: state.searchDriver,
                });
              }}>
              <Icon name={'account-plus'} size={25} />
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default RankingNavigator;
