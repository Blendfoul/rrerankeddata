import {useRaceContext} from '../store/RaceContext';
import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {ReducerActions} from '../store/StoreReducer';
import axiosInstanceGenerator from './useAxiosMock';

const useRatingContext = () => {
  const [state, dispatch] = useRaceContext();
  const [loadingRatings, setLoading] = useState<boolean>(true);

  const getRatings = useCallback(async () => {
    const source = axios.CancelToken.source();

    try {
      const res = await axiosInstanceGenerator(
        'multiplayer-rating/ratings.json',
        {
          cancelToken: source.token,
        },
      );
      await dispatch({
        type: ReducerActions.SET_RATINGS,
        payload: res.data,
      });
    } catch (error) {
      await dispatch({
        type: ReducerActions.ERROR,
        payload: error,
      });
    } finally {
      setLoading(false);
    }

    return () => source.cancel('Request cancelled!');
  }, [dispatch]);

  useEffect(() => {
    getRatings();
  }, []);

  return {loadingRatings};
};

export default useRatingContext;
