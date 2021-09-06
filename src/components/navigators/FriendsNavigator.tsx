import React, {useContext} from 'react';
import {Button, IconButton} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {LocalizationContext} from '../translations/LocalizationContext';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
          headerLeft: () => (
            <IconButton
              icon={'menu'}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name={translations.navigation.driverDetails}
        component={DriverDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default FriendsNavigator;
