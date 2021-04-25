import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LeaderboardComponent from '../leaderboard/LeaderboardComponent';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

interface LeaderboardNavigatorProps {
  navigation: DrawerNavigationProp<any>;
}

const LeaderboardNavigator: React.FC<LeaderboardNavigatorProps> = ({
  navigation,
}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.navigation.leaderboard}
        component={LeaderboardComponent}
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

export default LeaderboardNavigator;
