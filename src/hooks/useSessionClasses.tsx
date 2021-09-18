import {useCallback, useEffect, useState} from 'react';
import {QualiResult, RaceResult} from '../types/resultData';

const useSessionClasses = (data: QualiResult[] | RaceResult[]) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [values, setData] = useState<QualiResult[][] | RaceResult[][]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [ids, setIds] = useState<number[]>([]);

  const filterClasses = useCallback(() => {
    const classIndex = data
      .map(driver => driver.PerformanceIndex)
      .filter((value, index, array) => array.indexOf(value) === index);

    const classNames: string[] = data.map(driver => driver.CarClass.Name);
    const classIds: number[] = data.map(driver => driver.CarClass.Id);

    setNames([...new Set(classNames)]);
    setIds([...new Set(classIds)]);

    setData(
      classIndex.map(id =>
        data.filter(driver => driver.PerformanceIndex === id),
      ),
    );
    setLoading(false);
  }, [data]);

  useEffect(() => {
    filterClasses();

    return () => undefined;
  }, [filterClasses]);

  return {values, names, ids, loading};
};

export default useSessionClasses;
