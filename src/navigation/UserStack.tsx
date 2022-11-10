import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DrawerRoutes,
  DrawerStackList,
  UserRoutes,
  UserStackList,
} from '../models/navigation/Navigation';
import { useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';
import SessionScreen from '../screens/SessionScreen';
import DefaultUserScreen from '../screens/DefaultUserScreen';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { defaultUserActions, idSelector } from '../store/slices/DefaultUser';

const Stack = createNativeStackNavigator<UserStackList>();

type RouteProps = DrawerNavigationProp<DrawerStackList, DrawerRoutes.USER>;

const UserStack: React.FC = () => {
  const navigation = useNavigation<RouteProps>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const id = useSelector(idSelector);

  const removeDefaultUser = () => {
    dispatch(defaultUserActions.setUserId(-1));
  };

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name={UserRoutes.USER}
          component={DefaultUserScreen}
          options={{
            headerLeft: props => (
              <IconButton
                {...props}
                icon={'menu'}
                onPress={() => navigation.openDrawer()}
              />
            ),
            headerRight: props =>
              id !== -1 && (
                <IconButton
                  {...props}
                  icon={'account-remove-outline'}
                  onPress={removeDefaultUser}
                />
              ),
          }}
        />
        <Stack.Screen
          name={UserRoutes.RESULT}
          component={SessionScreen}
          options={{
            title: t('drawer.result'),
          }}
        />
        <Stack.Screen
          name={UserRoutes.DETAILS}
          component={SessionDetailsScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default UserStack;
