import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {QualiResult, RaceResult, Result} from '../../models/data/Result';
import {RootState} from '../Store';

export const fetchSession = createAsyncThunk<RaceResult, string>(
  'result/fetch-result',
  async result => {
    const response = await axios(
      `https://r3e-advanced-statistics.netlify.app/.netlify/functions/api/result/${result}`,
    );

    return response.data;
  },
);

type SessionState = {
  isLoading: boolean;
} & Result;

const initialState: Partial<SessionState> = {
  isLoading: true,
};

const SessionSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSession.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(fetchSession.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      ...action.payload,
    }));
  },
});

export const resultSelector = (state: RootState) => state.result;

export const qualiSelector = createSelector<
  RootState,
  SessionState,
  QualiResult[]
>(resultSelector, state => state.QualiResult);

export const raceSelector = createSelector(
  resultSelector,
  state => state.RaceResult,
);

export default SessionSlice.reducer;
