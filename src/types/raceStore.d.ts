interface R3EData {
  cars: any;
  liveries: any;
  tracks: any;
  layouts: any;
  classes: any;
  manufacturers: any;
  teams: any;
}

interface RateModal {
  isVisible: boolean;
  isRated: boolean;
  nOpens: number;
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
  rateModal: RateModal;
}

export interface Action {
  type: number;
  payload: any;
}
