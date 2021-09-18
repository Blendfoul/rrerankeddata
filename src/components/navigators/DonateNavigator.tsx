import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LocalizationContext} from '../translations/LocalizationContext';
import {IconButton} from 'react-native-paper';
import DonateScreen from '../screens/DonateScreen';
import {useNavigation} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackList} from '../../types/NavigatorProps';

const Stack = createStackNavigator();

const DonateNavigator: React.FC = () => {
  const {translations} = useContext(LocalizationContext);
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackList>>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.navigation.donate}
        component={DonateScreen}
        options={{
          headerLeft: () => (
            <IconButton
              icon={'menu'}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default DonateNavigator;
