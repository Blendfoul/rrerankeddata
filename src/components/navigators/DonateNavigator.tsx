import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Button, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DonateScreen from '../screens/DonateScreen';

const Stack = createStackNavigator();

const DonateNavigator: React.FC<any> = ({navigation}) => {
  const {translations} = useContext(LocalizationContext);

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
