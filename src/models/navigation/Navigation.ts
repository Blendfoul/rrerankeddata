import {Rating} from '../data/Ranked';
import {QualiResult, RaceResult} from '../data/Result';

export type DrawerStackList = {
  ServerDrawer: undefined;
  UserDrawer: {
    id: number;
  };
  FriendsDrawer: {
    id: number;
  };
  SearchDrawer: undefined;
  RankingDrawer: undefined;
  AboutDrawer: undefined;
  Schedule: undefined;
  DonateDrawer: undefined;
};

export type ServerStackList = {
  Home: undefined;
  Server: {
    id: string;
  };
  Schedule: undefined;
} & UserStackList;

export type SearchStackList = {
  Search: undefined;
} & UserStackList;

export type RankingStackList = {
  Ranking: undefined;
} & UserStackList;

export type UserStackList = {
  User: {
    id: number;
  };
  Result: {
    hash: string;
    type: 'Default' | 'User';
  };
  Details: {
    data: RaceResult;
  };
};

export type FriendsStackList = {
  Friends: undefined;
} & UserStackList;

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
    type: 'User' | 'Default';
  };
  Races: {
    id: number;
    type: 'User' | 'Default';
  };
};

export type SessionTabStackList = {
  Info: {
    hash: string;
    type: 'User' | 'Default';
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
  DONATE = 'DonateDrawer',
  FRIENDS = 'FriendsDrawer',
  SCHEDULE = 'Schedule',
}

export enum ServerRoutes {
  HOME = 'Home',
  SERVER = 'Server',
  USER = 'User',
  RESULT = 'Result',
  DETAILS = 'Details',
}

export enum SearchRoutes {
  SEARCH = 'Search',
  USER = 'User',
  RESULT = 'Result',
  DETAILS = 'Details',
}

export enum RankingRoutes {
  RANKING = 'Ranking',
  USER = 'User',
  RESULT = 'Result',
  DETAILS = 'Details',
}

export enum UserRoutes {
  USER = 'User',
  RESULT = 'Result',
  DETAILS = 'Details',
}

export enum FriendsRoutes {
  FRIENDS = 'Friends',
  USER = 'User',
  RESULT = 'Result',
  DETAILS = 'Details',
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
