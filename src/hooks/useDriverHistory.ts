import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Result} from '../types/results';
import axiosInstanceGenerator from './useAxiosMock';

interface History {
  Entries: Result[];
  TotalEntries: number;
}

const useDriverHistory = (username: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<History | null>(null);

  const refetch = () => setLoading(true);

  const getHistoryData = useCallback(async () => {
    const source = axios.CancelToken.source();

    try {
      const response = await axiosInstanceGenerator(
        `users/${username}/career/?json`,
        {
          cancelToken: source.token,
        },
      );

      const races =
        response.data.context.c.raceList.GetUserMpRatingProgressResult.Entries.reverse();
      await AsyncStorage.multiSet([
        ['USERNAME', username],
        ['RACE_HISTORY', JSON.stringify(races)],
        [
          'RACE_ENTRIES',
          response.data.context.c.raceList.GetUserMpRatingProgressResult.TotalEntries.toString(),
        ],
      ]);

      setData({
        Entries: races,
        TotalEntries:
          response.data.context.c.raceList.GetUserMpRatingProgressResult
            .TotalEntries,
      });

      return () => source.cancel();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (loading) {
      getHistoryData();
    }
  }, [loading, getHistoryData]);

  return {loading, data, refetch};
};

export default useDriverHistory;