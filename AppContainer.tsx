import {RaceProvider} from './src/store/RaceContext';
import React from 'react';
import App from './App';
import {LocalizationProvider} from './src/components/translations/LocalizationContext';
import axios from 'axios';
import {DefaultTheme, Provider} from 'react-native-paper';

axios.defaults.baseURL = 'https://game.raceroom.com/';

const theme = {
  ...DefaultTheme,
  font: {
    android: {
      regular: {
        fontFamily: 'Kwajong',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Kwajong',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Kwajong',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Kwajong',
        fontWeight: 'normal',
      },
    },
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
