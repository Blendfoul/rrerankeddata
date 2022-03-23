import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {Rating} from '../../models/data/Ranked';
import axios from 'axios';
import {RootState} from '../Store';

export const fetchRatings = createAsyncThunk<Rating[]>(
  'general/ratings',
  async () => {
    const response = await axios(
      'https://game.raceroom.com/multiplayer-rating/ratings.json',
    );

    return response.data;
  },
);

type RatingState = {
  ratings: Rating[];
  isLoading: boolean;
};

const initialState = {
  ratings: [],
  isLoading: false,
} as Partial<RatingState>;

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRatings.pending, state => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchRatings.fulfilled, (state, action) => {
      return {
        ...state,
        ratings: action.payload,
        isLoading: false,
      };
    });
  },
});

const ratSelector: (state: RootState) => RatingState = state => state.ratings;

export const ratingSelector = (from: number, to: number) => {
  return createSelector<RootState, RatingState, Rating[]>(
    ratSelector,
    state => {
      return state.ratings.slice(from, to);
    },
  );
};

export const ratingsLength = createSelector<RootState, RatingState, number>(
  ratSelector,
  state => state.ratings.length,
);

export const ratingsComplete = createSelector<RootState, RatingState, Rating[]>(
  ratSelector,
  state => state.ratings,
);

export const driverSelector = (driverId: number) => {
  return createDraftSafeSelector(ratSelector, state =>
    state.ratings?.find((driver: Rating) => driver.UserId === driverId),
  );
};

export const ratingPositionSelector = (id: number) =>
  createSelector<RootState, RatingState, number>(
    ratSelector,
    state => state.ratings.findIndex(item => item.UserId === id) + 1,
  );

export default ratingsSlice.reducer;
