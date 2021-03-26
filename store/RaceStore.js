import type {Server} from '../interfaces/Server';
import type {Driver} from '../interfaces/Driver';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RaceStore {
  Username: String;
  Region: String;
  AvailableRegions: String[];
  Races: Server[];
  Ratings: Driver[];
  SearchDriver: String;
  DefaultDriver: String;
  Refresh: Boolean;

  setSearchDriver(driver: String): (driver: String) => void;

  setDefaultDriver(driver: String): (region: String) => void;

  setRefresh(isRefreshing: boolean): (isRefreshing: boolean) => void;

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
    Refresh: true,
    SearchDriver: '',
    DefaultDriver: '',
    setSearchDriver(driver: String) {
      this.SearchDriver = driver;
    },
    setDefaultDriver(driver) {
      this.DefaultDriver = driver;
      storeData(driver);
    },
    setRefresh(isRefreshing: boolean) {
      this.Refresh = isRefreshing;
      if (isRefreshing) {
        this.Races = [];
      }
    },
    setRatings(ratings: Driver[]) {
      this.Ratings = ratings;
    },
    setRegion(region: String) {
      this.Region = region;
      storeRegion(region);
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

const storeData = async value => {
  try {
    await AsyncStorage.setItem('defaultDriver', value);
  } catch (e) {
    console.log(e);
  }
};

const storeRegion = async value => {
  try {
    await AsyncStorage.setItem('selectedRegion', value);
  } catch (e) {
    console.log(e);
  }
};
