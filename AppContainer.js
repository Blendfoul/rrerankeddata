import {RaceProvider} from './store/RaceContext';
import React from 'react';
import App from './App';

const AppContainer = () => (
  <RaceProvider>
    <App />
  </RaceProvider>
);

export default AppContainer;
