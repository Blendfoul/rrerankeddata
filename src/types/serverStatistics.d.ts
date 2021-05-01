import {Rating} from './rating';

export interface ServerStatistics {
  drivers: Rating[];
  sof: number;
  rep: number;
}
