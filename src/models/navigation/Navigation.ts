import {Rating} from '../data/Ranked';
import { QualiResult, RaceResult } from "../data/Result";

export type DrawerStackList = {
  ServerDrawer: undefined;
  UserDrawer: {
    id: number;
  };
  SearchDrawer: undefined;
  RankingDrawer: undefined;
  AboutDrawer: undefined;
  Schedule: undefined;
};

export type ServerStackList = {
  Home: undefined;
  Server: {
    id: string;
  };
  Schedule: undefined;
} & UserStackList;

export type UserStackList = {
  User: {
    id: number;
  };
  Result: {
    hash: string;
  };
};

export type ServerTabStackList = {
  Info: {
    id: string;
    data: {
      sof: number;
      rep: number;
      drivers: Rating[];
    };
  };
  Drivers: {
    id: string;
    data: {
      sof: number;
      rep: number;
      drivers: Rating[];
    };
  };
};

export type UserTabStackList = {
  Info: {
    id: number;
  };
  Races: {
    id: number;
  };
};

export type SessionTabStackList = {
  Info: {
    hash: string;
  };
  Qualification: {
    data: QualiResult[];
  };
  Race: {
    data: RaceResult[];
  };
};

export enum DrawerRoutes {
  SERVER = 'ServerDrawer',
  USER = 'UserDrawer',
  SEARCH = 'SearchDrawer',
  RANKING = 'RankingDrawer',
  ABOUT = 'AboutDrawer',
  SCHEDULE = 'Schedule',
}

export enum ServerRoutes {
  HOME = 'Home',
  SERVER = 'Server',
  USER = 'User',
  RESULT = 'Result',
}

export enum UserRoutes {
  USER = 'User',
  RACE = 'Result',
}

export enum ServerTabRoutes {
  INFO = 'Info',
  DRIVERS = 'Drivers',
}

export enum UserTabRoutes {
  INFO = 'Info',
  RACES = 'Races',
}

export enum SessionTabRoutes {
  INFO = 'Info',
  QUALIFICATION = 'Qualification',
  RACE = 'Race',
}
