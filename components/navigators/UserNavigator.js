import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DefaultUser from '../screens/DefaultUser';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import {LocalizationContext} from '../translations/LocalizationContext';

const Stack = createStackNavigator();

const UserNavigator = ({route, navigation}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'My driver'}
        component={DefaultUser}
        options={{
          headerShown: false,
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
    </Stack.Navigator>
  );
};

export default UserNavigator;
