import React, {useContext} from 'react';
import {LocalizationContext} from '../translations/LocalizationContext';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import SettingsComponent from '../settings/SettingsComponent';
import SettingsDetails from '../settings/SettingsDetails';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const SettingsNavigator: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const {translations} = useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.navigation.settings}
        component={SettingsComponent}
        options={{
          headerLeft: () => (
            <IconButton
              icon={'menu'}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen name={'setting-details'} component={SettingsDetails} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
