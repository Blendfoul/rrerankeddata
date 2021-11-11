import {useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import {Rating} from '../models/data/Ranked';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {sortBy} from 'lodash';
import {ratingsComplete} from '../store/slices/Ratings';
import {User} from '../models/data/User';

const useDrivers = (driversId: number[]) => {
  const ratings = useSelector(ratingsComplete);
  const [drivers, setDrivers] = useState<Rating[]>([]);
  const source = axios.CancelToken.source();

  const calculate = useCallback(async () => {
    const ratings1: Rating[] = await Promise.all(
      driversId.map(async id => {
        const driver: Rating | undefined = ratings.find(
          (data: Rating) => data.UserId === id,
        );

        if (!driver) {
          const response: AxiosResponse<User> = await axios(
            `https://game.raceroom.com/utils/user-info/${id}`,
            {
              cancelToken: source.token,
            } as AxiosRequestConfig,
          );

          return {
            Fullname: response.data.name,
            Username: response.data.username,
            UserId: response.data.id,
            Rating: 1500,
            Reputation: 70,
            Country: response.data.country.code.toUpperCase(),
            Team: '',
            ActivityPoints: 0,
            RacesCompleted: 0,
          } as Rating;
        }

        return driver;
      }),
    );

    setDrivers(sortBy(ratings1, a => a.Rating).reverse());
  }, []);

  useEffect(() => {
    calculate();

    return () => source.cancel();
  }, [calculate, driversId]);

  return {drivers};
};

export default useDrivers;
