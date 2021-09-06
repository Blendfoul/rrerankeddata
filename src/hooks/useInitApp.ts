import {useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReducerActions} from '../store/StoreReducer';
import SplashScreen from 'react-native-splash-screen';
import {useRaceContext} from '../store/RaceContext';
import {useNetInfo} from '@react-native-community/netinfo';
import useR3EData from './useR3EData';

const useInitApp = () => {
  const [state, dispatch] = useRaceContext();
  const {loading} = useR3EData();
  const isConnected = useNetInfo();

  const getRatings = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('defaultDriver');
      const open = await AsyncStorage.getItem('opens');
      const rated = await AsyncStorage.getItem('rated');
      const region = await AsyncStorage.getItem('selectedRegion');

      if (open !== null && rated !== null) {
        let nOpens = parseInt(open);
        dispatch({
          type: ReducerActions.SET_RATE_ACTION,
          payload: {
            isVisible: false,
            nOpens: ++nOpens,
            isRated: rated === 'true',
          },
        });
      } else {
        dispatch({
          type: ReducerActions.SET_RATE_ACTION,
          payload: {
            ...state.rateModal,
            nOpens: 1,
          },
        });
      }

      if (region !== null) {
        dispatch({
          type: ReducerActions.SET_REGION,
          payload: region,
        });
      }
      if (value !== null) {
        dispatch({
          type: ReducerActions.READ_DEFAULT_DRIVER,
          payload: value,
        });
      }
    } catch (e) {
      console.error('[Ratings] ' + e.message);
    }
  }, [dispatch]);

  useEffect(() => {
    getRatings();
    SplashScreen.hide();
  }, [isConnected.isConnected, getRatings]);

  return {loading, isConnected: isConnected.isConnected};
};

export default useInitApp;
