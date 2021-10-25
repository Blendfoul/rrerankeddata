import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {RaceHistory, Result, User} from '../../models/data/User';
import {reverse} from 'lodash';
import {RootState} from '../Store';

export const fetchUser = createAsyncThunk<User, number>(
  'default-user/driver-info',
  async driverId => {
    const response = await axios(
      `https://game.raceroom.com/utils/user-info/${driverId}`,
    );

    return response.data as User;
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

export const ratingSelector = createDraftSafeSelector<
  RatingData,
  UserState,
  RootState
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
  } as RatingData;
});

export const userRacesSelector = createDraftSafeSelector(
  userSelector,
  state => ({races: state.races, isLoading: state.isLoadingRaces}),
);

export const defaultUserActions = DefaultUserSlice.actions;

export default DefaultUserSlice.reducer;