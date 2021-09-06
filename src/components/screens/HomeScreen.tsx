import React from 'react';
import {StatusBar} from 'react-native';
import RaceContainer from '../race/RaceContainer';
import ScheduleComponent from '../utils/ScheduleComponent';
import {useTheme} from 'react-native-paper';
import RateModalComponent from '../utils/RateModal';

const HomeScreen: React.FC = () => {
  const {colors} = useTheme();

  return (
    <React.Fragment>
      <StatusBar backgroundColor={colors.backdrop} />
      <RaceContainer />
      <ScheduleComponent />
      <RateModalComponent />
    </React.Fragment>
  );
};

export default HomeScreen;
