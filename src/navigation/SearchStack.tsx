import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DrawerStackList,
  SearchRoutes,
  SearchStackList,
} from '../models/navigation/Navigation';
import SearchScreen from '../screens/SearchScreen';
import UserScreen from '../screens/UserScreen';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {defaultUserActions, idSelector} from '../store/slices/DefaultUser';
import SessionScreen from '../screens/SessionScreen';
import {useDispatch, useSelector} from 'react-redux';
import {userIdSelector} from '../store/slices/User';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';

const Stack = createNativeStackNavigator<SearchStackList>();

type NavigationProps = DrawerNavigationProp<DrawerStackList>;

const SearchStack: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const searchId = useSelector(userIdSelector);
  const id = useSelector(idSelector);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SearchRoutes.SEARCH}
        component={SearchScreen}
        options={{
          headerLeft: props => (
            <IconButton
              {...props}
              icon={'menu'}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name={SearchRoutes.USER}
        component={UserScreen}
        options={{
          headerRight: props => (
            <IconButton
              {...props}
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
      <Stack.Screen name={SearchRoutes.RESULT} component={SessionScreen} />
      <Stack.Screen
        name={SearchRoutes.DETAILS}
        component={SessionDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
