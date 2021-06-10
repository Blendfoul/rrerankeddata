import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import RaceContainer from '../race/RaceContainer';
import {AdMobBanner} from 'react-native-admob';
import {getRatings} from '../../hooks/useAxiosMock';
import {useRaceContext} from '../../store/RaceContext';
import ScheduleComponent from '../utils/ScheduleComponent';
import {useTheme} from 'react-native-paper';
import RateModalComponent from '../utils/RateModal';

const HomeScreen: React.FC = () => {
  const [state, dispatch] = useRaceContext();
  const {colors} = useTheme();

  useEffect(() => {
    getRatings(dispatch);
  }, [dispatch]);

  return (
    <React.Fragment>
      <StatusBar backgroundColor={colors.primary} />
      <RaceContainer />
      <AdMobBanner
        adSize={'smartBannerPortrait'}
        adUnitID="ca-app-pub-3693871231832720/1409720136" //"ca-app-pub-3940256099942544/6300978111"
        onAdFailedToLoad={(err: Error) => console.error(err)}
      />
      <ScheduleComponent />
      <RateModalComponent />
    </React.Fragment>
  );
};

export default HomeScreen;
