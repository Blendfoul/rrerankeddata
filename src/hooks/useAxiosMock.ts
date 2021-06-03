import axios from 'axios';
import {ReducerActions} from '../store/StoreReducer';
import React from 'react';
import {Action} from '../types/raceStore';

const axiosInstanceGenerator = axios.create({
  baseURL: 'https://game.raceroom.com/',
});

export default axiosInstanceGenerator;

export const getRaces = async (dispatch: React.Dispatch<Action>) => {
  const source = axios.CancelToken.source();

  try {
    const res = await axiosInstanceGenerator('multiplayer-rating/servers/', {
      cancelToken: source.token,
    });
    await dispatch({
      type: ReducerActions.SET_RACES,
      payload: res.data.result,
    });
  } catch (error) {
    await dispatch({
      type: ReducerActions.ERROR,
      payload: error,
    });
  }

  return () => source.cancel('Request cancelled!');
};

export const getRatings = async (dispatch: React.Dispatch<Action>) => {
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
  }

  return () => source.cancel('Request cancelled!');
};
