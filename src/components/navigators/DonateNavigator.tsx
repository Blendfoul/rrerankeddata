import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Button, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DonateScreen from '../screens/DonateScreen';

const Stack = createStackNavigator();

const DonateNavigator: React.FC<any> = ({navigation}) => {
  const {translations} = useContext(LocalizationContext);
  const {colors} = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.navigation.donate}
        component={DonateScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: 'white',
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

export default DonateNavigator;
