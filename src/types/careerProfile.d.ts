import {GenericProfile} from './genericProfile';
import {Result} from './results';

export interface CareerProfile extends GenericProfile {
  raceList: {
    TotalEntries: number;
    Entries: Result[];
  };
}
