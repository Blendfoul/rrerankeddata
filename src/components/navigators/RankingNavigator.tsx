import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {Button, IconButton} from 'react-native-paper';
import {LocalizationContext} from '../translations/LocalizationContext';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';
import RatingScreen from '../screens/RatingScreen';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';

const Stack = createStackNavigator();

interface RankingProp {
  navigation: DrawerNavigationProp<ParamListBase>;
}

const RankingNavigator: React.FC<RankingProp> = ({navigation}) => {
  const {translations} = useContext(LocalizationContext);
  const [state, dispatch] = useRaceContext();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.navigation.ranking}
        component={RatingScreen}
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
