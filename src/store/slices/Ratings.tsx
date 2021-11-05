import {
  createAsyncThunk,
  createDraftSafeSelector,
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

type GeneralState = {
  ratings: Rating[];
  isLoading: boolean;
};

const initialState = {
  ratings: [],
  isLoading: false,
} as Partial<GeneralState>;

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

const ratSelector = (state: RootState) => state.ratings;

export const ratingSelector = createDraftSafeSelector(
  ratSelector,
  state => state.ratings,
);

export const driverSelector = (driverId: number) => {
  return createDraftSafeSelector(ratSelector, state =>
    state.ratings?.find((driver: Rating) => driver.UserId === driverId),
  );
};

export default ratingsSlice.reducer;
