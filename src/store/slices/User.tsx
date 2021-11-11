import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSelector,
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
      `https://game.raceroom.com/utils/user-info/${driverId}`,
    );

    return response.data as User;
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
  searchId: number;
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
  reducers: {
    setSearchId: (state, action) => ({
      ...state,
      searchId: action.payload,
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

const userSelector = (state: RootState) => state.user as UserState;

export const userLoadingSelector = createSelector<
  RootState,
  UserState,
  boolean
>(userSelector, state => state.isLoading);

export const userNameSelector = createDraftSafeSelector(
  userSelector,
  state => ({
    name: state?.user?.name,
    isLoading: state.isLoading,
  }),
);

export const userIdSelector = createDraftSafeSelector(
  userSelector,
  state => state.searchId,
);

export const userDataSelector = createDraftSafeSelector(
  userSelector,
  state => ({user: state.user, isLoading: state.isLoading}),
);

type RatingData = {
  data: {
    rating: number[];
    reputation: number[];
  };
  isLoading: boolean;
};

export const userRatingSelector = createSelector<
  RootState,
  UserState,
  RatingData
>(userSelector, state => {
  return {
    data: {
      rating: state?.races?.Entries.map(
        (race: Result) => race.RatingAfter,
      ).reverse(),
      reputation: state?.races?.Entries.map(
        (race: Result) => race.ReputationAfter,
      ).reverse(),
    },
    isLoading: state.isLoadingRaces,
  };
});

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

export const {actions} = UserSlice;

export default UserSlice.reducer;
