import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {Rating} from '../../models/data/Ranked';
import {RootState} from '../Store';
import {R3eData} from '../../models/data/General';

export const fetchR3eData = createAsyncThunk<R3eData>(
  'general/r3e-data',
  async () => {
    const response = await axios(
      'https://raw.githubusercontent.com/sector3studios/r3e-spectator-overlay/master/r3e-data.json',
    );

    return response.data;
  },
);

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
  r3eData: R3eData;
  ratings: Rating[];
  isLoading: boolean;
};

const initialState = {
  ratings: [],
  r3eData: {
    cars: {},
    classes: {},
    layouts: {},
    liveries: {},
    manufacturers: {},
    teams: {},
    tracks: {},
  },
  isLoading: false,
} as Partial<GeneralState>;

const GeneralSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchR3eData.pending, state => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchRatings.pending, state => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchR3eData.fulfilled, (state, action) => {
      return {
        ...state,
        r3eData: action.payload,
        isLoading: false,
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

const generalSelector = (state: RootState) => state.general;

export const ratingSelector = createDraftSafeSelector(
  generalSelector,
  state => state.ratings,
);
export const dataSelector = createDraftSafeSelector(
  generalSelector,
  state => state.r3eData as R3eData,
);

export const driverSelector = (driverId: number) => {
  return createDraftSafeSelector(generalSelector, state =>
    state.ratings?.find((driver: Rating) => driver.UserId === driverId),
  );
};

export default GeneralSlice.reducer;
