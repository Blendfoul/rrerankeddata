import {RaceProvider} from './src/store/RaceContext';
import React from 'react';
import App from './App';
import {LocalizationProvider} from './src/components/translations/LocalizationContext';
import {Provider} from 'react-native-paper';

const AppContainer = () => {
  return (
    <Provider>
      <LocalizationProvider>
        <RaceProvider>
          <App />
        </RaceProvider>
      </LocalizationProvider>
    </Provider>
  );
};

export default AppContainer;
