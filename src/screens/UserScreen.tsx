import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ServerStackList,
  UserRoutes,
  UserTabRoutes,
  UserTabStackList,
} from '../models/navigation/Navigation';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserDetails from '../components/User/UserDetails';
import UserRaces from '../components/User/UserRaces';
import {useSelector} from 'react-redux';
import {userNameSelector} from '../store/slices/User';

type RouteProps = NativeStackScreenProps<ServerStackList, UserRoutes.USER>;

const TabStack = createMaterialTopTabNavigator<UserTabStackList>();

const UserScreen: React.FC = () => {
  const {params} = useRoute<RouteProps['route']>();
  const navigation = useNavigation();
  const user = useSelector(userNameSelector);

  useEffect(() => {
    navigation.setOptions({
      title: user,
    });
  }, [user]);

  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name={UserTabRoutes.INFO}
        component={UserDetails}
        initialParams={{id: params.id}}
      />
      <TabStack.Screen
        name={UserTabRoutes.RACES}
        component={UserRaces}
        initialParams={{id: params.id}}
      />
    </TabStack.Navigator>
  );
};

export default UserScreen;
