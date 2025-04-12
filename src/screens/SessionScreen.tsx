import React, { useEffect } from 'react';

import { useRoute } from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import QualiComponent from '../components/session/QualiComponent';
import RaceComponent from '../components/session/RaceComponent';
import SessionInformation from '../components/session/SessionInformation';
import LoadingComponent from '../components/shared/LoadingComponent';
import {
  SessionTabStackList,
  SessionTabRoutes,
  UserStackList,
} from '../models/navigation/Navigation';
import { fetchSession, resultSelector } from '../store/slices/Session';

const Tab = createMaterialTopTabNavigator<SessionTabStackList>();

type Props = NativeStackScreenProps<UserStackList, 'Result'>['route'];

const SessionScreen: React.FC = () => {
  const { params } = useRoute<Props>();
  const dispatch = useDispatch();
  const data = useSelector(resultSelector);
  const { t } = useTranslation();

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
        options={{
          title: t('result.tabs.info'),
        }}
        initialParams={{
          hash: params.hash,
          type: params.type,
        }}
      />
      <Tab.Screen
        name={SessionTabRoutes.QUALIFICATION}
        component={QualiComponent}
        options={{
          title: t('result.tabs.qualification'),
        }}
        initialParams={{ data: data.QualiResult }}
      />
      <Tab.Screen
        name={SessionTabRoutes.RACE}
        component={RaceComponent}
        options={{
          title: t('result.tabs.race'),
        }}
        initialParams={{ data: data.RaceResult }}
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
