import {RaceStore} from '../types/raceStore';

export const createRaceStore = (): RaceStore => {
  return {
    username: '',
    races: [],
    regionRaces: [],
    region: '',
    ratings: [],
    searchDriver: '',
    defaultDriver: '',
    schedule: false,
    refresh: true,
    notifyDefaultDriver: false,
    driver: {
      header: '',
      avatar: '',
    },
  };
};
