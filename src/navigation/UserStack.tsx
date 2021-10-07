import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DrawerRoutes,
  DrawerStackList,
  UserRoutes,
  UserStackList,
} from '../models/navigation/Navigation';
import UserScreen from '../screens/UserScreen';
import {useNavigation} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {userIdSelector} from '../store/slices/User';

const Stack = createNativeStackNavigator<UserStackList>();

type RouteProps = DrawerNavigationProp<DrawerStackList, DrawerRoutes.USER>;

const UserStack: React.FC = () => {
  const navigation = useNavigation<RouteProps>();
  const user = useSelector(userIdSelector);

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name={UserRoutes.USER}
          component={UserScreen}
          initialParams={{id: user}}
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
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default UserStack;
