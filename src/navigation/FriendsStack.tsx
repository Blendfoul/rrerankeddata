import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DrawerStackList,
  FriendsRoutes,
  FriendsStackList,
} from '../models/navigation/Navigation';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import SessionScreen from '../screens/SessionScreen';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import FriendsScreen from '../models/navigation/FriendsScreen';
import UserScreen from '../screens/UserScreen';
type NavigationProps = DrawerNavigationProp<DrawerStackList>;

const Stack = createNativeStackNavigator<FriendsStackList>();

const FriendsStack: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={FriendsRoutes.FRIENDS}
        component={FriendsScreen}
        options={{
          headerLeft: props => (
            <IconButton
              {...props}
              icon={'menu'}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen name={FriendsRoutes.USER} component={UserScreen} />
      <Stack.Screen name={FriendsRoutes.RESULT} component={SessionScreen} />
      <Stack.Screen
        name={FriendsRoutes.DETAILS}
        component={SessionDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default FriendsStack;
