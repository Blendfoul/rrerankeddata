import {RaceProvider} from './src/store/RaceContext';
import React from 'react';
import App from './App';
import {LocalizationProvider} from './src/components/translations/LocalizationContext';
import RatingProvider from './src/store/RatingProvider';

const AppContainer = () => {
  return (
    <LocalizationProvider>
      <RaceProvider>
        <RatingProvider>
          <App />
        </RatingProvider>
      </RaceProvider>
    </LocalizationProvider>
  );
};

export default AppContainer;
