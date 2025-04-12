import { use, useCallback, useEffect, useState } from 'react';

import { sortBy } from 'lodash';
import { useSelector } from 'react-redux';

import { Rating } from '../models/data/Ranked';
import { User } from '../models/data/User';
import { ratingsComplete } from '../store/slices/Ratings';

const useDrivers = (driversId: number[]) => {
  const ratings = useSelector(ratingsComplete);
  const source = new AbortController();

  const calculate = useCallback(async (AbortController: AbortController) => {
    const ratings1: Rating[] = await Promise.all(
      driversId.map(async (id) => {
        const driver: Rating | undefined = ratings.find((data: Rating) => data.UserId === id);

        if (!driver) {
          const response = await fetch(`https://game.raceroom.com/utils/user-info/${id}`, {
            signal: AbortController.signal,
          });

          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }

          const data = (await response.json()) as User;

          return {
            Fullname: data.name,
            Username: data.username,
            UserId: data.id,
            Rating: 1500,
            Reputation: 70,
            Country: data.country.code.toUpperCase(),
            Team: '',
            ActivityPoints: 0,
            RacesCompleted: 0,
          } as Rating;
        }

        return driver;
      }),
    );

    return sortBy(ratings1, (a) => a.Rating).reverse();
  }, []);

  useEffect(() => {
    return () => {
      source.abort();
    };
  }, [driversId]);

  const drivers = use(calculate(source));

  return { drivers };
};

export default useDrivers;
