interface R3EData {
  cars: any;
  liveries: any;
  tracks: any;
  layouts: any;
  classes: any;
  manufacturers: any;
  teams: any;
}

export interface RaceStore {
  searchDriver: string;
  ratings: any[];
  races: any[];
  driver: {
    header: string;
    avatar: string;
  };
  username: string;
  notifyDefaultDriver: boolean;
  regionRaces: any[];
  defaultDriver: string;
  r3e_data: R3EData;
  region: string;
  schedule: boolean;
  refresh: boolean;
}

export interface Action {
  type: number;
  payload: any;
}
