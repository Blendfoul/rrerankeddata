import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {RaceHistory, User} from '../../models/data/User';
import {reverse} from 'lodash';
import {RootState} from '../Store';

export const fetchUser = createAsyncThunk<User, number>(
  'default-user/driver-info',
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
  'default-user/driver-races',
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
  userId: number;
  user: User;
  isLoading: boolean;
  isLoadingRaces: boolean;
  races: RaceHistory;
};

const initialState = {
  isLoading: true,
  isLoadingRaces: true,
} as UserState;

const DefaultUserSlice = createSlice({
  name: 'default-user',
  initialState,
  reducers: {
    setUserId: (state, action) => ({
      ...state,
      userId: action.payload,
    }),
  },
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

const userSelector = (state: RootState) => state.defaultUser;

export const idSelector = createDraftSafeSelector(
  userSelector,
  state => state.userId,
);

export const dataSelector = createDraftSafeSelector(userSelector, state => ({
  user: state.user,
  isLoading: state.isLoading,
}));

export const userRacesSelector = createDraftSafeSelector(
  userSelector,
  state => ({races: state.races, isLoading: state.isLoadingRaces}),
);

export const defaultUserActions = DefaultUserSlice.actions;

export default DefaultUserSlice.reducer;
