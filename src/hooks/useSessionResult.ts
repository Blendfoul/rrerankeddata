import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import axiosInstanceGenerator from './useAxiosMock';
import {MpRaceResult} from '../types/resultData';

const useSessionResult = (sessionId: string) => {
  const [response, setResponse] = useState<MpRaceResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const source = axios.CancelToken.source();

  const fetchResult = useCallback(async () => {
    try {
      const response1 = await axiosInstanceGenerator(
        `multiplayer/results/${sessionId}`,
        {
          cancelToken: source.token,
        },
      );

      const response2 = await axiosInstanceGenerator(
        'https://raceroom.dhsh.tk/api/race/' + sessionId,
        {
          baseURL: '',
          cancelToken: source.token,
        },
      );

      setResponse({
        RaceInfos: response2.data.RaceInfos,
        ...response1.data.GetMpRaceResultResult,
      });
    } catch (e) {
      if (!axios.isCancel(e)) {
        console.error(e);
      }
    } finally {
      setLoading(false);
    }

    return () => source.cancel();
  }, [sessionId]);

  useEffect(() => {
    fetchResult();

    return () => source.cancel();
  }, [fetchResult]);

  return {response, loading};
};

export default useSessionResult;
