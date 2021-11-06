import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  SessionTabStackList,
  SessionTabRoutes,
  UserStackList,
} from '../models/navigation/Navigation';
import {useRoute} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSession, resultSelector} from '../store/slices/Session';
import LoadingComponent from '../components/shared/LoadingComponent';
import SessionInformation from '../components/session/SessionInformation';
import QualiComponent from '../components/session/QualiComponent';
import RaceComponent from '../components/session/RaceComponent';
import {StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator<SessionTabStackList>();

type Props = NativeStackScreenProps<UserStackList, 'Result'>['route'];

const SessionScreen: React.FC = () => {
  const {params} = useRoute<Props>();
  const dispatch = useDispatch();
  const data = useSelector(resultSelector);

  useEffect(() => {
    dispatch(fetchSession(params.hash));
  }, []);

  if (data.isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.label,
      }}>
      <Tab.Screen
        name={SessionTabRoutes.INFO}
        component={SessionInformation}
        initialParams={{hash: params.hash}}
      />
      <Tab.Screen
        name={SessionTabRoutes.QUALIFICATION}
        component={QualiComponent}
        initialParams={{data: data.QualiResult}}
      />
      <Tab.Screen
        name={SessionTabRoutes.RACE}
        component={RaceComponent}
        initialParams={{data: data.RaceResult}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
  },
});

export default SessionScreen;
