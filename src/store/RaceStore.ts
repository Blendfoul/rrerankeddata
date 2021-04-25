import type {Server} from '../@types/Server';
import type {Driver} from '../@types/Driver';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RaceStore {
  setRegion(region: String): void;
  setDriver(driver: {avatar: string; header: string}): void;
  setUsername(name: string): void;
  setRegionRaces(races: Server[]): void;
  setRatings(ratings: Driver[]): void;
  SearchDriver: string;
  Ratings: any[];
  setDefaultDriver(driver: string): void;
  Races: any[];
  driver: {
    header: string;
    avatar: string;
  };
  Username: string;
  notifyDefaultDriver: boolean;
  RegionRaces: any[];
  DefaultDriver: string;
  Region: string;
  setNotification(state: Boolean): void;
  setSearchDriver(driver: String): void;
  setRaces(races: Server[]): void;
}

export const createRaceStore = (): RaceStore => {
  return {
    Username: '',
    Races: [],
    RegionRaces: [],
    Region: '',
    Ratings: [],
    SearchDriver: '',
    DefaultDriver: '',
    notifyDefaultDriver: false,
    driver: {
      header: '',
      avatar: '',
    },
    setSearchDriver(driver: string) {
      this.SearchDriver = driver;
    },
    setNotification(state: boolean) {
      this.notifyDefaultDriver = state;
    },
    setDefaultDriver(driver: string) {
      this.DefaultDriver = driver;
      storeData(driver);
    },
    setRatings(ratings: Driver[]) {
      this.Ratings = ratings;
    },
    setRegion(region: string) {
      this.Region = region;
      storeRegion(region);
    },
    setRaces(races: Server[]) {
      this.Races = races;
    },
    setRegionRaces(races: Server[]) {
      this.RegionRaces = races;
    },
    setUsername(name: string) {
      this.Username = name;
    },
    setDriver(driver) {
      this.driver = driver;
    },
  };
};

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('defaultDriver', value);
  } catch (e) {
    console.error('[Store Data] ' + e.message);
  }
};

const storeRegion = async (value: string) => {
  try {
    await AsyncStorage.setItem('selectedRegion', value);
  } catch (e) {
    console.error('[Store Region] ' + e.message);
  }
};
