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
import {useTranslation} from 'react-i18next';

const Tab = createMaterialTopTabNavigator<SessionTabStackList>();

type Props = NativeStackScreenProps<UserStackList, 'Result'>['route'];

const SessionScreen: React.FC = () => {
  const {params} = useRoute<Props>();
  const dispatch = useDispatch();
  const data = useSelector(resultSelector);
  const {t} = useTranslation();

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
        initialParams={{hash: params.hash}}
      />
      <Tab.Screen
        name={SessionTabRoutes.QUALIFICATION}
        component={QualiComponent}
        options={{
          title: t('result.tabs.qualification'),
        }}
        initialParams={{data: data.QualiResult}}
      />
      <Tab.Screen
        name={SessionTabRoutes.RACE}
        component={RaceComponent}
        options={{
          title: t('result.tabs.race'),
        }}
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
