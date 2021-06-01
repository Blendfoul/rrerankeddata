import {RaceProvider} from './src/store/RaceContext';
import React from 'react';
import App from './App';
import {LocalizationProvider} from './src/components/translations/LocalizationContext';
import {DefaultTheme, Provider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2f2f2f',
    accent: '#f4f4f4',
    text: '#fff',
  },
};

const AppContainer = () => {
  return (
    <Provider theme={theme}>
      <LocalizationProvider>
        <RaceProvider>
          <App />
        </RaceProvider>
      </LocalizationProvider>
    </Provider>
  );
};

export default AppContainer;
