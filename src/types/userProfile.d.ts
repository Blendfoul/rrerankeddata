import {GenericProfile} from './genericProfile';

export interface UserProfile extends GenericProfile {
  overview: {
    statistics: {
      leaderboards: GeneralData[];
      points: GeneralData[];
      race_stats: {
        championship: GeneralData[];
        single_race: GeneralData[];
      };
      favorites: GeneralData[];
    };
    name: string;
    career: {};
    country: {
      code: string;
      name: string;
    };
    most_used_cars: MostUsedData[];
    most_used_tracks: MostUsedData[];
    basic_statistics: GeneralData[];
    vip: boolean;
    simbiner: boolean;
    team: string;
    header: string;
    avatar: string;
  };
}

export interface MostUsedData {
  path: string | null;
  image: {
    full: string;
    scaled: string;
  };
  name: string;
}

export interface GeneralData {
  value: string | number;
  label: string;
}
