import React, { StrictMode, Suspense, use, useCallback } from 'react';

import { DarkTheme as NavDark, DefaultTheme as NavDefault } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { withIAPContext } from 'react-native-iap';
import { MD3DarkTheme, DefaultTheme, Provider } from 'react-native-paper';

import LoadingAppComponent from './src/components/shared/LoadingAppComponent';
import DrawerStack from './src/navigation/DrawerStack';
import { R3eData } from './src/models/data/General';
import { generalStateActions } from './src/store/external-store/General';

const paperDefault: typeof DefaultTheme = {
  ...DefaultTheme,
};

const paperDark: typeof MD3DarkTheme = {
  ...MD3DarkTheme,
};

const App: React.FC = () => {
  const colorScheme = useColorScheme();

  const getData = useCallback(async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/sector3studios/r3e-spectator-overlay/master/r3e-data.json',
      );
    
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
    
      const data = await response.json() as R3eData;
    
      generalStateActions.updateR3eData(data);
  }, []);

  use(getData());

  return (
    <StrictMode>
      <Suspense fallback={<LoadingAppComponent />}>
        <Provider theme={colorScheme === 'light' ? paperDefault : paperDark}>

        </Provider>
      </Suspense>
    </StrictMode>
    
  );
};

export default withIAPContext(App);
