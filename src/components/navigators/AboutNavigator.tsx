import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {LocalizationContext} from '../translations/LocalizationContext';
import AboutComponent from '../about/AboutComponent';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

interface AboutNavigatorProps {
  navigation: DrawerNavigationProp<any>;
}

const AboutNavigator: React.FC<AboutNavigatorProps> = ({navigation}) => {
  const {translations} = useContext(LocalizationContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.navigation.about}
        component={AboutComponent}
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

export default AboutNavigator;
