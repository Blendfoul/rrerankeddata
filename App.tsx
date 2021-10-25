import React, {useEffect} from 'react';

import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {useFlipper} from '@react-navigation/devtools';
import {ServerStackList} from './src/models/navigation/Navigation';
import {batch, Provider as StoreProvider} from 'react-redux';
import {persists, store} from './src/store/Store';
import DrawerStack from './src/navigation/DrawerStack';
import {DarkTheme, DefaultTheme, Provider} from 'react-native-paper';
import {
  DarkTheme as NavDark,
  DefaultTheme as NavDefault,
} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {fetchR3eData} from './src/store/slices/General';
import {useColorScheme} from 'react-native';
import LoadingAppComponent from './src/components/shared/LoadingAppComponent';

const App: React.FC = () => {
  const navRef = createNavigationContainerRef<ServerStackList>();
  const colorScheme = useColorScheme();

  useFlipper(navRef);

  useEffect(() => {
    batch(() => {
      store.dispatch(fetchR3eData());
    });
  }, []);

  useEffect(() => {}, [colorScheme]);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={<LoadingAppComponent />} persistor={persists}>
        <Provider theme={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
          <NavigationContainer
            ref={navRef}
            theme={colorScheme === 'light' ? NavDefault : NavDark}>
            <DrawerStack />
          </NavigationContainer>
        </Provider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
