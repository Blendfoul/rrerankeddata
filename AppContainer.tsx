import {RaceProvider} from './src/store/RaceContext';
import React from 'react';
import App from './App';
import {LocalizationProvider} from './src/components/translations/LocalizationContext';
import RatingProvider from './src/store/RatingProvider';
import {Platform} from 'react-native';

const AppContainer = () => {
  return (
    <LocalizationProvider>
      <RaceProvider>
        <RatingProvider>
          {Platform.OS === 'web' ? (
            <style type="text/css">{`
        @font-face {
          font-family: 'MaterialCommunityIcons';
          src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
        }
      `}</style>
          ) : null}
          <App />
        </RatingProvider>
      </RaceProvider>
    </LocalizationProvider>
  );
};

export default AppContainer;
