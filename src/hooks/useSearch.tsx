import { useCallback, useEffect, useState, use } from 'react';

import { useSelector } from 'react-redux';

import { Rating } from '../models/data/Ranked';
import { SearchUser } from '../models/data/User';
import { ratingsComplete } from '../store/slices/Ratings';

const useSearch = (name: string) => {
  const ratings = useSelector(ratingsComplete);
  const abortSignal = new AbortController();

  const fetchUsers = useCallback(
    async (abortSignal: AbortController) => {
      try {
        const response = await fetch(`https://game.raceroom.com/search?query=${name}`, {
          signal: abortSignal.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = (await response.json()) as SearchUser[];

        if (data.length !== 0) {
          return data;
        } else {
          const data = ratings.find(
            (driver: Rating) =>
              driver.Username.toLowerCase() === name.toLowerCase() ||
              driver.Fullname.toLowerCase() === name.toLowerCase(),
          );

          if (data !== undefined) {
            return [
              {
                name: data.Fullname,
                image: `https://game.raceroom.com/game/user_avatar/${data.UserId}`,
                meta_data: { slug: data.Username },
                type: 'user',
              },
            ];
          }
        }
      } catch {}
    },
    [name, ratings],
  );

  const data = use(fetchUsers(abortSignal));

  useEffect(() => {
    return () => {
      abortSignal.abort();
    };
  }, [name]);

  return { users: data, loading: false };
};

export default useSearch;
