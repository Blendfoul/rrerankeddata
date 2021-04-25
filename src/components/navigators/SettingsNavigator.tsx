import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LocalizationContext} from '../translations/LocalizationContext';
import SettingsComponent from '../settings/SettingsComponent';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

interface SettingsNavigatorProps {
  navigation: DrawerNavigationProp<any>;
}

const SettingsNavigator: React.FC<SettingsNavigatorProps> = ({navigation}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.navigation.settings}
        component={SettingsComponent}
        options={{
          headerStyle: {
            backgroundColor: '#2f2f2f',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <Button onPress={() => navigation.toggleDrawer()}>
              <Icon name="menu" size={25} color="white" />
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
