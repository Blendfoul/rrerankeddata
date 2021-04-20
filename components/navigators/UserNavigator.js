import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DefaultUser from '../screens/DefaultUser';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Button} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const UserNavigator = ({route, navigation}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'My driver'}
        component={DefaultUser}
        options={{
          headerStyle: {
            backgroundColor: '#2f2f2f',
          },
          headerTintColor: '#fff',
          headerLeft: props => (
            <Button
              icon={<MaterialIcons name="menu" size={25} color="white" />}
              title=""
              onPress={() => navigation.toggleDrawer()}
              type={'clear'}
            />
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
    </Stack.Navigator>
  );
};

export default UserNavigator;
