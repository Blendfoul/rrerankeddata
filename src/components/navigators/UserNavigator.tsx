import React, {useContext} from 'react';
import DefaultUser from '../screens/DefaultUser';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import {LocalizationContext} from '../translations/LocalizationContext';
import {IconButton} from 'react-native-paper';
import RaceComponent from '../session/race/RaceComponent';
import {DrawerStackList, UserStackList} from '../../types/NavigatorProps';
import {useNavigation} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<UserStackList>();

const UserNavigator: React.FC = () => {
  const {translations} = useContext(LocalizationContext);
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackList>>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'driver'}
        component={DefaultUser}
        options={{
          title: translations.navigation.myDriver,
          headerLeft: () => (
            <IconButton
              icon={'menu'}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name={'sessionDetails'}
        options={{
          title: translations.navigation.sessionDetails,
        }}
        component={SessionDetailsScreen}
      />
      <Stack.Screen
        name={'raceHistory'}
        options={{
          title: translations.navigation.race,
        }}
        component={RaceComponent}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;
