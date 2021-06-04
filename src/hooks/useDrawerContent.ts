import {useRaceContext} from '../store/RaceContext';
import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import axiosInstanceGenerator from './useAxiosMock';

export interface User {
  name: string;
  team: string;
  avatar: string;
  rating: number;
  reputation: number;
  id: number;
}

interface DrawerContent {
  driver: User | null;
  loading: boolean;
}

const useDrawerContent = (): DrawerContent => {
  const [state] = useRaceContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [driver, setDriver] = useState<User | null>(null);

  const getDriverData = useCallback(async () => {
    try {
      if (state.defaultDriver.length) {
        const source = axios.CancelToken.source();
        const response1 = await axiosInstanceGenerator(
          `utils/user-info/${state.defaultDriver}/`,
          {
            cancelToken: source.token,
          },
        );

        try {
          const response = await axiosInstanceGenerator({
            url: `multiplayer-rating/user/${response1.data.id}.json`,
            cancelToken: source.token,
          });
          setDriver({
            ...response1.data,
            rating: response.data.Rating,
            reputation: response.data.Reputation,
          });
        } catch (e) {
          setDriver({
            ...response1.data,
            rating: 1500,
            reputation: 70,
          });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [state.defaultDriver]);

  useEffect(() => {
    getDriverData();
  }, [getDriverData]);

  return {driver, loading};
};

export default useDrawerContent;
