import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DefaultUser from '../screens/DefaultUser';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Button} from 'react-native-paper';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RaceComponent from '../session/race/RaceComponent';

const Stack = createStackNavigator();

interface UserProps {
  navigation: DrawerNavigationProp<any>;
}

const UserNavigator: React.FC<UserProps> = ({navigation}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.navigation.myDriver}
        component={DefaultUser}
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
        name={translations.navigation.sessionDetails}
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

export default UserNavigator;
