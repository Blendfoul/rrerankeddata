import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { R3eData } from '../../models/data/General';

export const fetchR3eData = createAsyncThunk<R3eData>(
  'general/r3e-data',
  async () => {
    const response = await fetch(
      'https://raw.githubusercontent.com/sector3studios/r3e-spectator-overlay/master/r3e-data.json',
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    return data as R3eData;
  },
);

type GeneralState = {
  r3eData: R3eData;
  region: string;
  session: number;
  order: boolean;
  isLoading: boolean;
};

const initialState: Partial<GeneralState> = {
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
};

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
  (state?: Partial<GeneralState>) => state?.r3eData as R3eData,
);

export const orderSelector = createDraftSafeSelector(
  generalSelector,
  (state?: Partial<GeneralState>) => state?.order,
);

export const regionSelector = createDraftSafeSelector(
  generalSelector,
  (state?: Partial<GeneralState>) => state?.region,
);

export const sessionSelector = createDraftSafeSelector(
  generalSelector,
  (state?: Partial<GeneralState>) => state?.session,
);

export default GeneralSlice.reducer;
export const generalActions = GeneralSlice.actions;
