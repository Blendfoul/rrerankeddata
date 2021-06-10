import React, {useContext} from 'react';
import {Button} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {LocalizationContext} from '../translations/LocalizationContext';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

interface FriendsProps {
  navigation: DrawerNavigationProp<any>;
}

const FriendsNavigator: React.FC<FriendsProps> = ({navigation}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.navigation.friends}
        component={FriendsScreen}
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
        name={translations.navigation.driverDetails}
        component={DriverDetailsScreen}
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

export default FriendsNavigator;
