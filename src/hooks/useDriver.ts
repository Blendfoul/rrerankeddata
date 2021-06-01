import axios from 'axios';
import {UserProfile} from '../types/userProfile';
import {Rating} from '../types/rating';
import { useCallback, useEffect, useState } from "react";
import axiosInstanceGenerator from './useAxiosMock';

interface Driver {
  data: UserProfile;
  rating: Rating;
}

interface DriverDataProp {
  driver: Driver | null;
  loading: boolean;
}

const useDriver = (username: string): DriverDataProp => {
  const [loading, setLoading] = useState<boolean>(true);
  const [driver, setDriver] = useState<Driver | null>(null);

  const getData = useCallback(async () => {
    const source = axios.CancelToken.source();
    try {
      const profile = await axiosInstanceGenerator(`users/${username}/?json`, {
        cancelToken: source.token,
      });

      try {
        const ranked = await axiosInstanceGenerator(
          `multiplayer-rating/user/${profile.data.context.c.user_id}.json`,
          {cancelToken: source.token},
        );

        setDriver({
          data: profile.data.context.c,
          rating: ranked.data,
        });
      } catch (e) {
        setDriver({
          data: profile.data.context.c,
          rating: {
            ActivityPoints: 0,
            Country: '',
            Team: '',
            Fullname: '',
            UserId: 0,
            Username: '',
            Rating: 1500,
            Reputation: 70,
            RacesCompleted: 0,
          },
        });
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    getData();
  }, [getData]);

  return {driver, loading};
};

export default useDriver;
