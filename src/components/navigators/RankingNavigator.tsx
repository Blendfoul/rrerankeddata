import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {Button} from 'react-native-paper';
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
              <Icon name={'person-add'} size={25} color={'#fff'} />
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default RankingNavigator;
