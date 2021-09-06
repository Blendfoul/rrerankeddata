import {RaceStore} from '../types/raceStore';

export const createRaceStore = (): RaceStore => {
  return {
    theme: 'dark',
    username: '',
    races: [],
    regionRaces: [],
    region: '',
    ratings: [],
    searchDriver: '',
    defaultDriver: '',
    schedule: false,
    refresh: true,
    r3e_data: {
      cars: null,
      classes: null,
      layouts: null,
      liveries: null,
      manufacturers: null,
      teams: null,
      tracks: null,
    },
    notifyDefaultDriver: false,
    driver: {
      header: '',
      avatar: '',
    },
    rateModal: {
      isRated: false,
      isVisible: false,
      nOpens: 0,
    },
  };
};
