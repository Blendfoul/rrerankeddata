import {RaceProvider} from './src/store/RaceContext';
import React from 'react';
import App from './App';
import {LocalizationProvider} from './src/components/translations/LocalizationContext';
import {DefaultTheme, Provider} from 'react-native-paper';
import RatingProvider from './src/store/RatingProvider';

const theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2f2f2f',
    accent: '#CB292B',
    background: '#c0c0c0',
    text: '#fff',
  },
};

const AppContainer = () => {
  return (
    <Provider theme={theme}>
      <LocalizationProvider>
        <RaceProvider>
          <RatingProvider>
            <App />
          </RatingProvider>
        </RaceProvider>
      </LocalizationProvider>
    </Provider>
  );
};

export default AppContainer;
