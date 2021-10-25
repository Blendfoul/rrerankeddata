import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerRoutes, DrawerStackList} from '../models/navigation/Navigation';
import React, {useEffect} from 'react';
import ServerStack from './ServerStack';
import UserStack from './UserStack';
import {batch, useDispatch} from 'react-redux';
import {fetchRatings} from '../store/slices/General';
import DrawerComponent from '../components/drawer/DrawerComponent';
import SearchStack from './SearchStack';

const DrawerNavigator = createDrawerNavigator<DrawerStackList>();

const DrawerStack: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(fetchRatings());
    });
  }, []);

  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <DrawerComponent {...props} />}>
      <DrawerNavigator.Screen
        name={DrawerRoutes.SERVER}
        component={ServerStack}
      />
      <DrawerNavigator.Screen name={DrawerRoutes.USER} component={UserStack} />
      <DrawerNavigator.Screen
        name={DrawerRoutes.SEARCH}
        component={SearchStack}
      />
    </DrawerNavigator.Navigator>
  );
};

export default DrawerStack;
