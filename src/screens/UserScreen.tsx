import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ServerStackList,
  UserRoutes,
  UserTabRoutes,
  UserTabStackList,
} from '../models/navigation/Navigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserDetails from '../components/User/UserDetails';
import UserRaces from '../components/User/UserRaces';
import { useDispatch, useSelector } from 'react-redux';
import { actions, userNameSelector } from '../store/slices/User';
import { userDataSelector, fetchUser } from '../store/slices/User';
import { useTranslation } from 'react-i18next';

type RouteProps = NativeStackScreenProps<ServerStackList, UserRoutes.USER>;

const TabStack = createMaterialTopTabNavigator<UserTabStackList>();

const UserScreen: React.FC = () => {
  const { params } = useRoute<RouteProps['route']>();
  const navigation = useNavigation();
  const { name, isLoading } = useSelector(userNameSelector);
  const { user } = useSelector(userDataSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {}, [user]);

  useEffect(() => {
    dispatch(fetchUser(params.id));
  }, [params.id]);

  useEffect(() => {
    dispatch(actions.setSearchId(params.id));
    navigation.setOptions({
      title: !isLoading ? name : 'User',
    });
  }, [name]);

  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name={UserTabRoutes.INFO}
        component={UserDetails}
        options={{
          title: t('user.info'),
        }}
        initialParams={{
          id: params.id,
          type: 'User',
        }}
      />
      <TabStack.Screen
        name={UserTabRoutes.RACES}
        component={UserRaces}
        options={{
          title: t('user.races'),
        }}
        initialParams={{
          id: params.id,
          type: 'User',
        }}
      />
    </TabStack.Navigator>
  );
};

export default UserScreen;
