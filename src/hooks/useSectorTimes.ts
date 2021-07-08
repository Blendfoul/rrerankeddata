import {useCallback, useEffect, useState} from 'react';
import {Lap} from '../types/resultData';

const useSectorTimes = (data: Lap[]) => {
  const [lapTime, setLapTime] = useState<string>('');
  const [avgTime, setAvgTime] = useState<string>('');
  const [sectors, setSectors] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getValues = useCallback(() => {
    const filtered = data.filter(d => d.Valid);

    if (filtered.length) {
      const lap = filtered.reduce((acc, loc) => {
        if (loc.Time < 0) {
          return acc;
        }

        return acc.Time < loc.Time ? acc : loc;
      });

      setSectors(lap.SectorTimes);

      const times =
        data.map(lap => lap.Time).reduce((a, b) => a + b) / data.length;

      setAvgTime(
        `${Math.floor((times / 1000 / 60) << 0)}:${(
          (times / 1000) %
          60
        ).toFixed(3)}s`,
      );

      setLapTime(
        `${Math.floor((lap.Time / 1000 / 60) << 0)}:${(
          (lap.Time / 1000) %
          60
        ).toFixed(3)}s`,
      );
    }

    setLoading(false);
  }, [data]);

  useEffect(() => {
    getValues();
  }, [getValues]);

  return {lapTime, sectors, avgTime, loading};
};

export default useSectorTimes;
