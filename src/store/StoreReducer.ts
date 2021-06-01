import React from 'react';
import {Action, RaceStore} from '../types/raceStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeReducer: React.Reducer<RaceStore, Action> = (
  state: RaceStore,
  action: Action,
) => {
  switch (action.type) {
    case ReducerActions.SET_RACES:
      return {
        ...state,
        races: action.payload,
      };
    case ReducerActions.SET_REGION_RACES:
      return {
        ...state,
        regionRaces: action.payload,
      };
    case ReducerActions.SET_RATINGS:
      return {
        ...state,
        ratings: action.payload,
      };
    case ReducerActions.SET_DEFAULT_DRIVER:
      storeData(action.payload);
      return {
        ...state,
        defaultDriver: action.payload,
        notifyDefaultDriver: true,
      };
    case ReducerActions.SET_SEARCH_DRIVER:
      return {
        ...state,
        searchDriver: action.payload,
      };
    case ReducerActions.SET_REGION:
      storeRegion(action.payload);
      return {
        ...state,
        region: action.payload,
      };
    case ReducerActions.SET_DRIVER:
      return {
        ...state,
        driver: action.payload,
      };
    case ReducerActions.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ReducerActions.SET_NOTIFICATION:
      return {
        ...state,
        notifyDefaultDriver: action.payload,
      };
    default:
      throw new Error();
  }
};

export enum ReducerActions {
  SET_RACES,
  SET_REGION_RACES,
  SET_SEARCH_DRIVER,
  SET_RATINGS,
  SET_DEFAULT_DRIVER,
  SET_REGION,
  SET_DRIVER,
  ERROR,
  SET_NOTIFICATION,
}

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('defaultDriver', value);
  } catch (e) {
    console.error('[Store Data] ' + e.message);
  }
};

const storeRegion = async (value: string) => {
  try {
    await AsyncStorage.setItem('selectedRegion', value);
  } catch (e) {
    console.error('[Store Region] ' + e.message);
  }
};
