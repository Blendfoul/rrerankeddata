import {useCallback, useEffect, useState} from 'react';
import {useRaceContext} from '../store/RaceContext';
import axios, {CancelTokenSource} from 'axios';
import {ReducerActions} from '../store/StoreReducer';

const useR3EData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [state, dispatch] = useRaceContext();

  const fetchData = useCallback(async () => {
    const source: CancelTokenSource = axios.CancelToken.source();

    try {
      const response = await axios(
        'https://raw.githubusercontent.com/sector3studios/r3e-spectator-overlay/master/r3e-data.json',
      );

      dispatch({
        type: ReducerActions.SET_R3E_DATA,
        payload: response.data,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

    return () => source.cancel();
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {loading};
};

export default useR3EData;
