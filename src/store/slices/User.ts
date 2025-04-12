import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import reverse from 'lodash.reverse';

import { RaceHistory, Result, User } from '../../models/data/User';
import { RootState } from '../Store';

export const fetchUser = createAsyncThunk<User, number>('user/driver-info', async (driverId) => {
  const response = await fetch(
    `https://r3e-advanced-statistics.netlify.app/.netlify/functions/api/user/${driverId}`,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = (await response.json()) as User;

  return data;
});

export const fetchRaces = createAsyncThunk<RaceHistory, number>(
  'user/driver-races',
  async (driverId) => {
    const response = await fetch(
      `https://r3e-advanced-statistics.netlify.app/.netlify/functions/api/career/${driverId}`,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = (await response.json()) as RaceHistory;

    const { TotalEntries, Entries } = data;

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
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => ({
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
    builder.addCase(fetchRaces.pending, (state) => ({
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

export const userLoadingSelector = createSelector(userSelector, (state) => state.isLoading);

export const userNameSelector = createDraftSafeSelector(userSelector, (state) => ({
  name: state?.user?.name,
  isLoading: state.isLoading,
}));

export const userIdSelector = createDraftSafeSelector(userSelector, (state) => state.searchId);

export const userDataSelector = createDraftSafeSelector(userSelector, (state) => ({
  user: state.user,
  isLoading: state.isLoading,
}));

type RatingData = {
  data: {
    rating: number[];
    reputation: number[];
  };
  isLoading: boolean;
};

export const userRatingSelector = createSelector(userSelector, (state) => {
  return {
    data: {
      rating: state?.races?.Entries.map((race: Result) => race.RatingAfter).reverse(),
      reputation: state?.races?.Entries.map((race: Result) => race.ReputationAfter).reverse(),
    },
    isLoading: state.isLoadingRaces,
  };
});

export const userRacesSelector = createDraftSafeSelector(userSelector, (state) => ({
  races: state.races,
  isLoading: state.isLoadingRaces,
}));

export const resultSelector = (hash: string) => {
  return createDraftSafeSelector(
    userSelector,
    (state) => state.races.Entries.find((race) => race.RaceHash === hash) as Result,
  );
};

export const { actions } = UserSlice;

export default UserSlice.reducer;
