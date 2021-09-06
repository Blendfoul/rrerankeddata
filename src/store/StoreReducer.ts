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
    case ReducerActions.READ_DEFAULT_DRIVER:
      return {
        ...state,
        defaultDriver: action.payload,
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
    case ReducerActions.SET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      };
    case ReducerActions.REFRESH_SERVERS:
      return {
        ...state,
        refresh: action.payload,
      };
    case ReducerActions.SET_R3E_DATA:
      return {
        ...state,
        r3e_data: action.payload,
      };
    case ReducerActions.SET_RATE_ACTION: {
      storeOpens(action.payload.nOpens);
      storeRated(action.payload.isRated);
      return {
        ...state,
        rateModal: action.payload,
      };
    }
    case ReducerActions.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      throw new Error(`Action ${action.type} not supported!`);
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
  SET_SCHEDULE,
  REFRESH_SERVERS,
  SET_R3E_DATA,
  SET_RATE_ACTION,
  READ_DEFAULT_DRIVER,
  SET_THEME,
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

const storeOpens = async (value: number) => {
  try {
    await AsyncStorage.setItem('opens', value.toString());
  } catch (e) {
    console.error('[Store Open] ' + e.message);
  }
};

const storeRated = async (value: boolean) => {
  try {
    await AsyncStorage.setItem('rated', value.toString());
  } catch (e) {
    console.error('[Store Open] ' + e.message);
  }
};
