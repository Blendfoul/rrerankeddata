import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import {RaceHistory, Result, User} from '../../models/data/User';
import {reverse} from 'lodash';
import {RootState} from '../Store';

export const fetchDefaultUser = createAsyncThunk<User, number>(
  'default-user/driver-info',
  async driverId => {
    const response: AxiosResponse<User> = await axios(
      `https://game.raceroom.com/utils/user-info/${driverId}`,
    );

    return response.data;
  },
);

export const fetchDefaultRaces = createAsyncThunk<RaceHistory, number>(
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
  userId: -1,
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
    builder.addCase(fetchDefaultUser.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(fetchDefaultUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    });
    builder.addCase(fetchDefaultRaces.pending, state => ({
      ...state,
      isLoadingRaces: true,
    }));
    builder.addCase(fetchDefaultRaces.fulfilled, (state, action) => {
      return {
        ...state,
        isLoadingRaces: false,
        races: action.payload,
      };
    });
  },
});

const userSelector = (state: RootState) => state.defaultUser as UserState;

export const userNameSelector = createDraftSafeSelector(
  userSelector,
  state => ({
    name: state?.user?.name,
  }),
);

export const idSelector = createDraftSafeSelector(
  userSelector,
  state => state.userId as number,
);

export const dataSelector = createDraftSafeSelector(userSelector, state => ({
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

export const ratingSelector = createSelector<RootState, UserState, RatingData>(
  userSelector,
  state => {
    console.log(state);

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
  },
);

export const defaultUserRacesSelector = createDraftSafeSelector(
  userSelector,
  state => ({races: state.races, isLoading: state.isLoadingRaces}),
);

export const defaultUserResultSelector = (hash: string) => {
  return createSelector<RootState, UserState, Result>(userSelector, state =>
    state.races.Entries.find((race: Result) => race.RaceHash === hash),
  );
};

export const defaultUserActions = DefaultUserSlice.actions;

export default DefaultUserSlice.reducer;
