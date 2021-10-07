import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerRoutes, DrawerStackList} from '../models/navigation/Navigation';
import React, {useEffect} from 'react';
import ServerStack from './ServerStack';
import UserStack from './UserStack';
import {batch, useDispatch} from 'react-redux';
import {fetchR3eData, fetchRatings} from '../store/slices/General';

const DrawerNavigator = createDrawerNavigator<DrawerStackList>();

const DrawerStack: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(fetchRatings());
      dispatch(fetchR3eData());
    });
  }, []);

  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <DrawerNavigator.Screen
        name={DrawerRoutes.SERVER}
        component={ServerStack}
      />
      <DrawerNavigator.Screen name={DrawerRoutes.USER} component={UserStack} />
    </DrawerNavigator.Navigator>
  );
};

export default DrawerStack;
