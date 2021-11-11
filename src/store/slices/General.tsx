import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
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

type GeneralState = {
  r3eData: R3eData;
  region: string;
  session: number;
  order: boolean;
  isLoading: boolean;
};

const initialState = {
  r3eData: {
    cars: {},
    classes: {},
    layouts: {},
    liveries: {},
    manufacturers: {},
    teams: {},
    tracks: {},
  },
  region: '',
  session: -1,
  order: false,
  isLoading: false,
} as Partial<GeneralState>;

const GeneralSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setRegion: (state, action) => {
      return {
        ...state,
        region: action.payload,
      };
    },
    setSession: (state, action) => {
      return {
        ...state,
        session: action.payload,
      };
    },
    setOrder: (state, action) => {
      return {
        ...state,
        order: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchR3eData.pending, state => {
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
  },
});

const generalSelector = (state: RootState) => state.general;

export const dataSelector = createDraftSafeSelector(
  generalSelector,
  state => state.r3eData as R3eData,
);

export const orderSelector = createDraftSafeSelector(
  generalSelector,
  state => state.order,
);

export const regionSelector = createDraftSafeSelector(
  generalSelector,
  state => state.region,
);

export const sessionSelector = createDraftSafeSelector(
  generalSelector,
  state => state.session,
);

export default GeneralSlice.reducer;
export const generalActions = GeneralSlice.actions;
