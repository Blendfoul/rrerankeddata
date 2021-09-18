import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {LocalizationContext} from '../translations/LocalizationContext';
import AboutComponent from '../about/AboutComponent';
import {IconButton} from 'react-native-paper';

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

export default AboutNavigator;
