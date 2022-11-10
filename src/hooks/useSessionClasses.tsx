import { useEffect, useState } from 'react';
import { QualiResult, RaceResult } from '../models/data/Result';
import { sortBy } from 'lodash';

const useSessionClasses = (quali: QualiResult[] | RaceResult[]) => {
  const [classes, setClasses] = useState<QualiResult[][] | RaceResult[][]>([]);
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    const performanceIndexes = [
      ...new Set(quali.map<number[]>(q => q.PerformanceIndex)),
    ];

    const data = performanceIndexes.map<QualiResult[] | RaceResult[]>(index => {
      const unsorted = quali.filter(q => index === q.PerformanceIndex);
      return sortBy(unsorted, p => p.FinishPositionInClass);
    });

    const values = performanceIndexes.map(
      (q, index) => data[index][0].CarClass.Id,
    );

    setIds(values);
    setClasses(data);
  }, [quali]);

  return { classes, ids };
};

export default useSessionClasses;
