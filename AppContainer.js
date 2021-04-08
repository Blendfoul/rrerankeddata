import {RaceProvider} from './store/RaceContext';
import React from 'react';
import App from './App';
import {LocalizationProvider} from './components/translations/LocalizationContext';

const AppContainer = () => {
  return (
    <LocalizationProvider>
      <RaceProvider>
        <App />
      </RaceProvider>
    </LocalizationProvider>
  );
};

export default AppContainer;
