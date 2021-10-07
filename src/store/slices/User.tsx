import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '../Store';
import {RaceHistory, Result, User} from '../../models/data/User';
import {reverse} from 'lodash';

export const fetchUser = createAsyncThunk<User, number>(
  'user/driver-info',
  async driverId => {
    const response = await axios(
      `https://game.raceroom.com/users/${driverId}?json`,
    );

    const {
      name,
      most_used_cars,
      country,
      most_used_tracks,
      basic_statistics,
      header,
      avatar,
      team,
    } = response.data.context.c.overview;

    return {
      name,
      most_used_cars,
      country,
      most_used_tracks,
      basic_statistics,
      header,
      avatar,
      team,
      user_id: response.data.context.c.user_id,
    };
  },
);

export const fetchRaces = createAsyncThunk<RaceHistory, number>(
  'user/driver-races',
  async driverId => {
    const response = await axios(
      `https://game.raceroom.com/users/${driverId}/career?json`,
    );

    const {TotalEntries, Entries} =
      response.data.context.c.raceList.GetUserMpRatingProgressResult;

    return {
      TotalEntries,
      Entries: reverse(Entries),
    };
  },
);

type UserState = {
  user: User;
  isLoading: boolean;
  isLoadingRaces: boolean;
  races: RaceHistory;
};

const initialState = {
  isLoading: true,
  isLoadingRaces: true,
} as UserState;

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    });
    builder.addCase(fetchRaces.pending, state => ({
      ...state,
      isLoadingRaces: true,
    }));
    builder.addCase(fetchRaces.fulfilled, (state, action) => {
      return {
        ...state,
        isLoadingRaces: false,
        races: action.payload,
      };
    });
  },
});

const userSelector = (state: RootState) => state.user;

export const userNameSelector = createDraftSafeSelector(
  userSelector,
  state => state?.user?.name,
);

export const userIdSelector = createDraftSafeSelector(
  userSelector,
  state => state?.user?.user_id,
);

export const userDataSelector = createDraftSafeSelector(
  userSelector,
  state => ({user: state.user, isLoading: state.isLoading}),
);

export const userRacesSelector = createDraftSafeSelector(
  userSelector,
  state => ({races: state.races, isLoading: state.isLoadingRaces}),
);

export const resultSelector = (hash: string) => {
  return createDraftSafeSelector(
    userSelector,
    state => state.races.Entries.find(race => race.RaceHash === hash) as Result,
  );
};

export default UserSlice.reducer;
