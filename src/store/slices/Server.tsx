import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '../Store';
import {RankedServer} from '../../models/data/Ranked';
import {sortBy} from 'lodash';

export const fetchServers = createAsyncThunk<RankedServer[]>(
  'server/servers',
  async () => {
    const response = await axios(
      'https://game.raceroom.com/multiplayer-rating/servers/',
    );

    const {result} = response.data;

    return result;
  },
);

type ServerState = {
  server: RankedServer[];
  region: string;
  session: number;
  order: boolean;
  isLoading: boolean;
};

const initialState = {
  server: [],
  region: '',
  session: -1,
  order: false,
  isLoading: false,
} as ServerState;

const ServerSlice = createSlice({
  name: 'server',
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
    builder.addCase(fetchServers.pending, state => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchServers.fulfilled, (state, action) => {
      return {
        ...state,
        server: action.payload,
        isLoading: false,
      };
    });
  },
});

const selectServers = (state: RootState) => state.server;

export const selectedServerSelector = (serverId: string) => {
  return createDraftSafeSelector(selectServers, state => {
    return state.server.find(
      (server: RankedServer) => server.Server.Settings.ServerName === serverId,
    ) as RankedServer;
  });
};

export const selectRegionSelector = createDraftSafeSelector(
  selectServers,
  state => {
    let server =
      state.region.length > 0
        ? state.server.filter((server: RankedServer) =>
            server.Server.Settings.ServerName.includes(state.region),
          )
        : state.server;

    server =
      state.session !== -1
        ? server.filter(
            (a: RankedServer) => a.Server.CurrentSession === state.session,
          )
        : server;

    server = sortBy(server, (o: RankedServer) => o.Server.PlayersOnServer);

    server = state.order ? server : server.reverse();

    return {
      ...state,
      server,
    };
  },
);

export const orderSelector = createDraftSafeSelector(
  selectServers,
  state => state.order,
);

export const regionSelector = createDraftSafeSelector(
  selectServers,
  state => state.region,
);

export const sessionSelector = createDraftSafeSelector(
  selectServers,
  state => state.session,
);

export default ServerSlice.reducer;
export const serverActions = ServerSlice.actions;
