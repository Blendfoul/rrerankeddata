import {useCallback, useEffect, useState} from 'react';
import {Lap} from '../types/resultData';

const useSectorTimes = (data: Lap[]) => {
  const [lapTime, setLapTime] = useState<string>('');
  const [sectors, setSectors] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getValues = useCallback(() => {
    const lap = data
      .filter(d => d.Time > 0)
      .reduce((acc, loc) => (acc.Time < loc.Time ? acc : loc));

    console.log(lap);

    setSectors(lap.SectorTimes);

    setLapTime(
      `${Math.floor((lap.Time / 1000 / 60) << 0)}:${(
        (lap.Time / 1000) %
        60
      ).toFixed(3)}s`,
    );

    setLoading(false);
  }, [data]);

  useEffect(() => {
    getValues();
  }, [getValues]);

  return {lapTime, sectors, loading};
};

export default useSectorTimes;
