import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import {UserTabRoutes, UserTabStackList} from '../models/navigation/Navigation';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserDetails from '../components/User/UserDetails';
import UserRaces from '../components/User/UserRaces';
import {useDispatch, useSelector} from 'react-redux';
import {
  userNameSelector,
  fetchUser,
  idSelector,
} from '../store/slices/DefaultUser';

const TabStack = createMaterialTopTabNavigator<UserTabStackList>();

const DefaultUserScreen: React.FC = () => {
  const user = useSelector(idSelector);
  const navigation = useNavigation();
  const {name} = useSelector(userNameSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(user));
  }, [user]);

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [name]);

  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name={UserTabRoutes.INFO}
        component={UserDetails}
        initialParams={{
          id: user,
          type: 'Default',
        }}
      />
      <TabStack.Screen
        name={UserTabRoutes.RACES}
        component={UserRaces}
        initialParams={{id: user}}
      />
    </TabStack.Navigator>
  );
};

export default DefaultUserScreen;
