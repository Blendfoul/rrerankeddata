import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DrawerRoutes,
  DrawerStackList,
  ServerRoutes,
  ServerStackList,
} from '../models/navigation/Navigation';
import HomeScreen from '../screens/HomeScreen';
import ServerScreen from '../screens/ServerScreen';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import CalendarComponent from '../components/calendar/CalendarComponent';
import UserScreen from '../screens/UserScreen';
import {defaultUserActions, idSelector} from '../store/slices/DefaultUser';
import {useDispatch, useSelector} from 'react-redux';
import {userIdSelector, userLoadingSelector} from '../store/slices/User';
import SessionScreen from '../screens/SessionScreen';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator<ServerStackList>();

type NavigationProps = DrawerNavigationProp<DrawerStackList>;

const ServerStack: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const searchId = useSelector(userIdSelector);
  const id = useSelector(idSelector);
  const {t} = useTranslation();
  const isLoading = useSelector(userLoadingSelector);

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name={ServerRoutes.HOME}
          component={HomeScreen}
          options={{
            title: t('drawer.server'),
            headerLeft: props => (
              <IconButton
                {...props}
                icon={'menu'}
                onPress={() => navigation.openDrawer()}
              />
            ),
            headerRight: props => (
              <IconButton
                icon={'calendar-outline'}
                {...props}
                onPress={() =>
                  navigation.navigate({
                    name: DrawerRoutes.SCHEDULE,
                    params: undefined,
                  })
                }
              />
            ),
          }}
        />
        <Stack.Screen name={ServerRoutes.SERVER} component={ServerScreen} />
      </Stack.Group>
      <Stack.Screen
        name={ServerRoutes.USER}
        component={UserScreen}
        options={{
          headerRight: props => (
            <IconButton
              {...props}
              disabled={isLoading}
              icon={
                id === searchId
                  ? 'account-check-outline'
                  : 'account-plus-outline'
              }
              onPress={() => {
                dispatch(defaultUserActions.setUserId(searchId));
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ServerRoutes.RESULT}
        component={SessionScreen}
        options={{
          title: t('drawer.result'),
        }}
      />
      <Stack.Screen
        name={ServerRoutes.DETAILS}
        component={SessionDetailsScreen}
        options={{
          title: t('drawer.details'),
        }}
      />

      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name={DrawerRoutes.SCHEDULE}
          component={CalendarComponent}
          options={{
            title: t('drawer.schedule'),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ServerStack;
