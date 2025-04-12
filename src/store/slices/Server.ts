import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import sortBy from 'lodash.sortby';

import { RankedServer } from '../../models/data/Ranked';
import { RootState } from '../Store';

export const fetchServers = createAsyncThunk<RankedServer[]>('server/servers', async () => {
  const response = await fetch('https://game.raceroom.com/multiplayer-rating/servers/');

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = (await response.json()) as { result: RankedServer[] };

  const { result } = data;

  return result;
});

type ServerState = {
  server: RankedServer[];
  isLoading: boolean;
};

const initialState = {
  server: [],
  isLoading: false,
} as ServerState;

const ServerSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchServers.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchServers.fulfilled, (state, action) => {
      return {
        server: action.payload,
        isLoading: false,
      };
    });
  },
});

const selectServers = (state: RootState) => state.server as ServerState;

export const loadingServersSelector = createSelector(selectServers, (state) => state.isLoading);

export const selectedServerSelector = (serverId: string) => {
  return createDraftSafeSelector(selectServers, (state) => {
    return state.server.find(
      (server: RankedServer) => server.Server.Settings.ServerName === serverId,
    ) as RankedServer;
  });
};

export const selectRegionSelector = createDraftSafeSelector(
  (state: RootState) => state,
  ({ general: { region, session, order }, server }) => {
    let servers =
      region.length > 0
        ? server.server.filter((server: RankedServer) =>
            server.Server.Settings.ServerName.includes(region),
          )
        : server.server;

    servers =
      session !== -1
        ? servers.filter((a: RankedServer) => a.Server.CurrentSession === session)
        : servers;

    servers = sortBy(servers, (o: RankedServer) => o.Server.PlayersOnServer);

    servers = order ? servers : servers.reverse();

    return {
      ...server,
      server: servers,
    };
  },
);

export default ServerSlice.reducer;
