import React from 'react';

import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {useFlipper} from '@react-navigation/devtools';
import {ServerStackList} from './src/models/navigation/Navigation';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './src/store/Store';
import DrawerStack from './src/navigation/DrawerStack';
import {Provider} from 'react-native-paper';

const App: React.FC = () => {
  const navRef = createNavigationContainerRef<ServerStackList>();

  useFlipper(navRef);

  return (
    <StoreProvider store={store}>
      <Provider>
        <NavigationContainer ref={navRef}>
          <DrawerStack />
        </NavigationContainer>
      </Provider>
    </StoreProvider>
  );
};

export default App;
