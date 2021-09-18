import React, {useContext} from 'react';
import {IconButton} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {LocalizationContext} from '../translations/LocalizationContext';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/core';
import {DrawerStackList, FriendsStackList} from '../../types/NavigatorProps';

const Stack = createStackNavigator<FriendsStackList>();

const FriendsNavigator: React.FC = () => {
  const {translations} = useContext(LocalizationContext);
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackList>>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'friendsList'}
        component={FriendsScreen}
        options={{
          title: translations.navigation.friends,
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
        options={{
          title: translations.navigation.driverDetails,
        }}
        component={DriverDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default FriendsNavigator;
