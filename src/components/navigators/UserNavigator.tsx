import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DefaultUser from '../screens/DefaultUser';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Button, IconButton} from 'react-native-paper';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
          headerLeft: () => (
            <IconButton
              icon={'menu'}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
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

export default UserNavigator;
