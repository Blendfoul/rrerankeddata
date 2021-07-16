import {Rating} from '../types/rating';
import axios, {AxiosRequestConfig} from 'axios';
import {useRaceContext} from '../store/RaceContext';
import {useCallback, useEffect, useState} from 'react';
import axiosInstanceGenerator from './useAxiosMock';
import * as _ from 'lodash';

const useServerSof = (driversId: number[]) => {
  const [state] = useRaceContext();
  const [sof, setSof] = useState<number>(0);
  const [rep, setRep] = useState<number>(0);
  const [drivers, setDrivers] = useState<Rating[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const calculate = useCallback(async () => {
    const source = axios.CancelToken.source();
    const ratings: Rating[] = await Promise.all(
      driversId.map(async id => {
        const driver: Rating | undefined = state.ratings.find(
          (data: Rating) => data.UserId === id,
        );

        if (!driver) {
          const response = await axiosInstanceGenerator(
            `utils/user-info/${id}`,
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

    setDrivers(_.sortBy(ratings, a => a.Rating).reverse());

    if (ratings.length) {
      setSof(
        ratings.map(driver => driver.Rating).reduce((a, b) => a + b) /
          ratings.length,
      );

      setRep(
        ratings.map(driver => driver.Reputation).reduce((a, b) => a + b) /
          ratings.length,
      );
    } else {
      setSof(1500);
      setRep(70);
    }

    setLoading(false);
  }, [driversId, state.ratings]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return {sof, rep, drivers, loading};
};
export default useServerSof;
