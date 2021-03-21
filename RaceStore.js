import type {Server} from './Server';
import type {Driver} from './Driver';

export interface RaceStore {
  Username: String;
  Region: String;
  AvailableRegions: String[];
  Races: Server[];
  Ratings: Driver[];
  setRatings(ratings: Driver[]): (ratings: Driver[]) => void;
  setRegion(region: String): (region: String) => void;
  setAvailableRegions(region: String[]): (region: String[]) => void;
  setRaces(races: Server[]): (races: Server[]) => void;
  setUsername(name: string): (name: String) => void;
}

export const createRaceStore = (): RaceStore => {
  return {
    Username: '',
    Races: [],
    Region: '',
    AvailableRegions: [],
    Ratings: [],
    setRatings(ratings: Driver[]) {
      this.Ratings = ratings;
    },
    setRegion(region: String) {
      this.Region = region;
      console.log(region);
    },
    setRaces(races: Server[]) {
      this.Races = races;
    },
    setUsername(name: string) {
      this.Username = name;
    },
    setAvailableRegions(regions: String[]) {
      this.AvailableRegions = regions;
    },
  };
};
