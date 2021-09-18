import {MpRaceResult, QualiResult, RaceResult} from './resultData';
import {GenericIdData} from './results';

export type SettingsScreenParams = {
  details: {
    title: string;
  };
};

export type DrawerStackList = {
  home: undefined;
  user: undefined;
  friends: undefined;
  searchDrawer: {
    id: string;
  };
  ranking: undefined;
  about: undefined;
  donate: undefined;
};

export type RaceStackList = {
  race: undefined;
  raceDetails: {
    data: string;
  };
  driverDetails: {
    data: string;
  };
  sessionDetails: {
    hash: string;
    track: GenericIdData;
  };
  raceViewer: undefined;
};

export type UserStackList = {
  driver: undefined;
  sessionDetails: undefined;
  raceHistory: undefined;
};

export type SearchStackList = {
  search: {
    id: string | number;
  };
  sessionDetails: undefined;
  raceHistory: undefined;
  driverDetails: {
    data: string;
  };
};

export type FriendsStackList = {
  friendsList: undefined;
  driverDetails: {
    data: string;
  };
};

export type RankingStackList = {
  rankingList: undefined;
  driverDetails: {
    data: string;
  };
};

export type ServerTabsStackList = {
  data: {
    serverName: string;
  };
  drivers: {
    serverName: string;
  };
};

export type SessionMaterialStackList = {
  data: {
    data: MpRaceResult;
  };
  qualification: {
    data: QualiResult[];
    type: string;
  };
  race: {
    data: RaceResult[];
    type: string;
  };
};

export type DriverMaterialStackList = {
  data: {
    username: string;
  };
  races: {
    username: string;
  };
};
