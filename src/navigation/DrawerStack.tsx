import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerRoutes, DrawerStackList} from '../models/navigation/Navigation';
import {batch, useDispatch} from 'react-redux';
import ServerStack from './ServerStack';
import UserStack from './UserStack';
import DrawerComponent from '../components/drawer/DrawerComponent';
import SearchStack from './SearchStack';
import FriendsStack from './FriendsStack';
import AboutStack from './AboutStack';
import {fetchRatings} from '../store/slices/Ratings';
import DonateStack from './DonateStack';

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
      <DrawerNavigator.Screen
        name={DrawerRoutes.FRIENDS}
        component={FriendsStack}
      />
      <DrawerNavigator.Screen
        name={DrawerRoutes.ABOUT}
        component={AboutStack}
      />
      <DrawerNavigator.Screen
        name={DrawerRoutes.DONATE}
        component={DonateStack}
      />
    </DrawerNavigator.Navigator>
  );
};

export default DrawerStack;
