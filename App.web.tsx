import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerStackList} from './src/types/NavigatorProps';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

const Drawer = createDrawerNavigator<DrawerStackList>();

const HomeScreen: React.FC = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name={'home'}
          options={{
            title: 'R3E Advanced Statistics',
          }}
          component={HomeScreen}
        />
        <Drawer.Screen name={'user'} component={() => null} />
        <Drawer.Screen name={'friends'} component={() => null} />
        <Drawer.Screen name={'searchDrawer'} component={() => null} />
        <Drawer.Screen name={'ranking'} component={() => null} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
