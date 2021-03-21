import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from './SearchScreen';

const Stack = createStackNavigator();

const SearchNavigator = ({route, navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Search'}
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
