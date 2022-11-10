import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../Store';
import { RankedServer } from '../../models/data/Ranked';
import { sortBy } from 'lodash';

export const fetchServers = createAsyncThunk<RankedServer[]>(
  'server/servers',
  async () => {
    const response = await axios(
      'https://game.raceroom.com/multiplayer-rating/servers/',
    );

    const { result } = response.data;

    return result;
  },
);

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
  extraReducers: builder => {
    builder.addCase(fetchServers.pending, state => {
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

const selectServers = (state: RootState) => state.server;

export const loadingServersSelector = createSelector<
  RootState,
  ServerState,
  boolean
>(selectServers, state => state.isLoading);

export const selectedServerSelector = (serverId: string) => {
  return createDraftSafeSelector<RootState, ServerState, RankedServer>(
    selectServers,
    state => {
      return state.server.find(
        (server: RankedServer) =>
          server.Server.Settings.ServerName === serverId,
      ) as RankedServer;
    },
  );
};

export const selectRegionSelector = createDraftSafeSelector<
  RootState,
  RootState,
  ServerState
>(
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
        ? servers.filter(
            (a: RankedServer) => a.Server.CurrentSession === session,
          )
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
