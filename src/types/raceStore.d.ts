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
  region: string;
  schedule: boolean;
  refresh: boolean;
}

export interface Action {
  type: number;
  payload: any;
}
