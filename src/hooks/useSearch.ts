import {useCallback, useEffect, useState} from 'react';
import {useRaceContext} from '../store/RaceContext';
import axios from 'axios';
import axiosInstanceGenerator from './useAxiosMock';

interface User {
  name: string;
  image: string;
  meta_data: {slug: string};
  type: string;
}

const useSearch = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [state] = useRaceContext();

  const getDrivers = useCallback(async () => {
    try {
      const source = axios.CancelToken.source();

      const response = await axiosInstanceGenerator(
        `search?query=${state.searchDriver}`,
        {
          cancelToken: source.token,
        },
      );

      if (response.data.length !== 0) {
        setUsers(response.data);
      } else {
        const data = state.ratings.find(
          driver =>
            driver.Username.toLowerCase() ===
              state.searchDriver.toLowerCase() ||
            driver.Fullname.toLowerCase() === state.searchDriver.toLowerCase(),
        );

        if (data !== undefined) {
          setUsers([
            {
              name: data.Fullname,
              image: `https://game.raceroom.com/game/user_avatar/${data.UserId}`,
              meta_data: {slug: data.Username},
              type: 'user',
            },
          ]);
        }
      }

      return () => source.cancel('Request Cancelled!');
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [state.ratings, state.searchDriver]);

  useEffect(() => {
    getDrivers();
  }, [getDrivers]);

  return {loading, users};
};

export default useSearch;
