import type {Server} from '../interfaces/Server';
import type {Driver} from '../interfaces/Driver';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Language} from '../interfaces/Language';

export interface RaceStore {
  Username: String;
  Region: String;
  Races: Server[];
  Ratings: Driver[];
  SearchDriver: String;
  DefaultDriver: String;
  Refresh: Boolean;
  notifyDefaultDriver: Boolean;
  driver: {avatar: String, header: String};
  language: Language;
  languageSelected: String;

  setSearchDriver(driver: String): (driver: String) => void;

  setDefaultDriver(driver: String): (region: String) => void;

  setRefresh(isRefreshing: boolean): (isRefreshing: boolean) => void;

  setRatings(ratings: Driver[]): (ratings: Driver[]) => void;

  setRegion(region: String): (region: String) => void;

  setRaces(races: Server[]): (races: Server[]) => void;

  setUsername(name: string): (name: String) => void;

  setNotification(state: Boolean): (state: Boolean) => void;

  setDriver(driver: {avatar: String, header: String}): (driver: {
    avatar: String,
    header: String,
  }) => void;

  setLanguage(language: String): (language: String) => void;
}

export const createRaceStore = (): RaceStore => {
  return {
    Username: '',
    Races: [],
    Region: '',
    Ratings: [],
    Refresh: true,
    SearchDriver: '',
    DefaultDriver: '',
    notifyDefaultDriver: false,
    driver: null,
    setSearchDriver(driver: String) {
      this.SearchDriver = driver;
    },
    setNotification(state: Boolean) {
      this.notifyDefaultDriver = state;
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
    setDriver(driver) {
      this.driver = driver;
    },
  };
};

const storeData = async value => {
  try {
    await AsyncStorage.setItem('defaultDriver', value);
  } catch (e) {
    console.error('[Store Data] ' + e.message);
  }
};

const storeRegion = async value => {
  try {
    await AsyncStorage.setItem('selectedRegion', value);
  } catch (e) {
    console.error('[Store Region] ' + e.message);
  }
};
