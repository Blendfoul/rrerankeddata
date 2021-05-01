import {Server} from '../types/server';
import {RaceStore} from '../store/RaceStore';
import {Rating} from '../types/rating';
import {AxiosRequestConfig, CancelToken} from 'axios';
import axiosInstance from './axiosInstance';
import {ServerStatistics} from '../types/serverStatistics';

export const getServerData = (
  serverName: string,
  raceStore: RaceStore,
): Server => {
  return raceStore.RegionRaces.find(
    (server: Server) => server.Server.Settings.ServerName === serverName,
  );
};

export const calculateServerSof = async (
  drivers: number[],
  raceStore: RaceStore,
  token: CancelToken,
): Promise<ServerStatistics> => {
  const data: ServerStatistics = {
    drivers: [],
    sof: 0,
    rep: 0,
  };

  await Promise.all(
    drivers.map(async driverId => {
      let driver: Rating = raceStore.Ratings.find(
        (driver1: Rating) => driver1.UserId === driverId,
      );

      if (driver !== undefined) {
        data.drivers.push(driver);
      } else {
        const response = await axiosInstance('/utils/user-info/' + driverId, {
          cancelToken: token,
        } as AxiosRequestConfig);

        data.drivers.push({
          Fullname: response.data.name,
          Username: response.data.username,
          UserId: response.data.id,
          Rating: 1500,
          Reputation: 70,
          Country: response.data.country.code.toUpperCase(),
          Team: '',
          ActivityPoints: 0,
          RacesCompleted: 0,
        } as Rating);
      }
    }),
  );

  if (data.drivers.length > 0) {
    data.drivers.forEach((driver: Rating) => {
      if (driver !== undefined) {
        data.sof += driver.Rating;
        data.rep += driver.Reputation;
      }
    });

    data.sof /= data.drivers.length;
    data.rep /= data.drivers.length;

    data.drivers.sort((a: Rating, b: Rating) => b.Rating - a.Rating);
  }

  return data;
};
