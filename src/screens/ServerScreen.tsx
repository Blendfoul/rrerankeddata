import React, {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  ServerRoutes,
  ServerStackList,
  ServerTabRoutes,
  ServerTabStackList,
} from '../models/navigation/Navigation';
import {useNavigation, useRoute} from '@react-navigation/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ServerDetails from '../components/server/ServerDetails';
import DriverDetails from '../components/server/DriverDetails';

type RouteProps = NativeStackScreenProps<ServerStackList, ServerRoutes.SERVER>;

type NavigationProps = NativeStackNavigationProp<
  ServerStackList,
  ServerRoutes.SERVER
>;

const TabStack = createMaterialTopTabNavigator<ServerTabStackList>();

const ServerScreen: React.FC = () => {
  const {setOptions} = useNavigation<NavigationProps>();
  const {params} = useRoute<RouteProps['route']>();
  const {width} = useWindowDimensions();

  useEffect(() => {
    setOptions({
      title: params.id,
    });
  }, []);

  return (
    <TabStack.Navigator initialLayout={{width}}>
      <TabStack.Screen
        name={ServerTabRoutes.INFO}
        component={ServerDetails}
        initialParams={{
          id: params.id,
        }}
      />
      <TabStack.Screen
        name={ServerTabRoutes.DRIVERS}
        component={DriverDetails}
        initialParams={{
          id: params.id,
        }}
      />
    </TabStack.Navigator>
  );
};

export default ServerScreen;
