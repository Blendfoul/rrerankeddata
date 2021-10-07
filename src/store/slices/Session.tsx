import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {RaceResult, Result} from '../../models/data/Result';
import {RootState} from '../Store';

export const fetchSession = createAsyncThunk<RaceResult, string>(
  'result/fetch-result',
  async result => {
    const response = await axios(
      `https://game.raceroom.com/multiplayer/results/${result}`,
    );

    return response.data.GetMpRaceResultResult;
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

export default SessionSlice.reducer;
