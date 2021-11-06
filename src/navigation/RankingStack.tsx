import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RankingScreen from '../screens/RankingScreen';
import {useTranslation} from 'react-i18next';
import {
  DrawerStackList,
  RankingRoutes,
  RankingStackList,
} from '../models/navigation/Navigation';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import SessionScreen from '../screens/SessionScreen';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import UserScreen from '../screens/UserScreen';

type Props = {};

const Stack = createNativeStackNavigator<RankingStackList>();

const RankingStack: React.FC<Props> = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackList>>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RankingRoutes.RANKING}
        component={RankingScreen}
        options={{
          title: t('drawer.ranking'),
          headerLeft: props => (
            <IconButton
              {...props}
              icon={'menu'}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Stack.Group>
        <Stack.Screen
          name={RankingRoutes.USER}
          component={UserScreen}
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
          name={RankingRoutes.RESULT}
          component={SessionScreen}
          options={{
            title: t('drawer.result'),
          }}
        />
        <Stack.Screen
          name={RankingRoutes.DETAILS}
          component={SessionDetailsScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RankingStack;
