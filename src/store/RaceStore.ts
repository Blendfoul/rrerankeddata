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
    notifyDefaultDriver: false,
    driver: {
      header: '',
      avatar: '',
    },
  };
};
