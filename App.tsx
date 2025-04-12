import React, { useEffect } from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux';
import { persists, store } from './src/store/Store';
import DrawerStack from './src/navigation/DrawerStack';
import { MD3DarkTheme, DefaultTheme, Provider } from 'react-native-paper';
import {
  DarkTheme as NavDark,
  DefaultTheme as NavDefault,
} from '@react-navigation/native';

import { fetchR3eData } from './src/store/slices/General';
import { useColorScheme } from 'react-native';
import LoadingAppComponent from './src/components/shared/LoadingAppComponent';
import { withIAPContext } from 'react-native-iap';
import UpdateContainer from './src/components/UpdateContainer';
import { PersistGate } from 'redux-persist/integration/react';

const paperDefault: typeof DefaultTheme = {
  ...DefaultTheme,
};

const paperDark: typeof MD3DarkTheme = {
  ...MD3DarkTheme,
};

const App: React.FC = () => {
  const colorScheme = useColorScheme();

  const getData = async () => {
    await store.dispatch(fetchR3eData());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={<LoadingAppComponent />} persistor={persists}>
        <Provider theme={colorScheme === 'light' ? paperDefault : paperDark}>
          <UpdateContainer>
            <NavigationContainer
              theme={colorScheme === 'light' ? NavDefault : NavDark}>
              <DrawerStack />
            </NavigationContainer>
          </UpdateContainer>
        </Provider>
      </PersistGate>
    </StoreProvider>
  );
};

export default withIAPContext(App);
