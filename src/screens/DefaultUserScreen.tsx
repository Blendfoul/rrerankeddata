import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import {UserTabRoutes, UserTabStackList} from '../models/navigation/Navigation';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserDetails from '../components/User/UserDetails';
import UserRaces from '../components/User/UserRaces';
import {useDispatch, useSelector} from 'react-redux';
import {
  userNameSelector,
  idSelector,
  fetchDefaultUser,
} from '../store/slices/DefaultUser';
import {useTranslation} from 'react-i18next';
import NoUserSelected from '../components/User/NoUserSelected';

const TabStack = createMaterialTopTabNavigator<UserTabStackList>();

const DefaultUserScreen: React.FC = () => {
  const user = useSelector(idSelector);
  const navigation = useNavigation();
  const {name} = useSelector(userNameSelector);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch(fetchDefaultUser(user));
  }, [user]);

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [name]);

  if (user === -1) {
    return <NoUserSelected />;
  }

  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name={UserTabRoutes.INFO}
        component={UserDetails}
        options={{
          title: t('user.info'),
        }}
        initialParams={{
          id: user,
          type: 'Default',
        }}
      />
      <TabStack.Screen
        name={UserTabRoutes.RACES}
        component={UserRaces}
        options={{
          title: t('user.races'),
        }}
        initialParams={{
          id: user,
          type: 'Default',
        }}
      />
    </TabStack.Navigator>
  );
};

export default DefaultUserScreen;
