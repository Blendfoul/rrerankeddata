import {useCallback, useEffect, useState} from 'react';
import {useRaceSelector} from '../store/hooks';
import {dataSelector} from '../store/slices/General';

const useCarClass = (classId?: number[], liveries?: number[]) => {
  const [classes, setClasses] = useState<number[]>([]);
  const {cars} = useRaceSelector(dataSelector);

  const handleClasses = useCallback(() => {
    if (classId !== undefined) {
      setClasses(classId);
    } else {
      const liveryArray = liveries;
      const classAvailable = new Set();
      if (liveryArray !== undefined) {
        liveryArray.forEach(value => {
          for (const key in cars) {
            if (cars.hasOwnProperty(key)) {
              //@ts-ignore
              const data = cars[key].liveries.find(
                (val: {Id: number}) => value === val.Id,
              );
              if (data !== undefined) {
                classAvailable.add(data.Class);
              }
            }
          }
        });
      }

      setClasses([...classAvailable] as number[]);
    }
  }, [classId, liveries]);

  useEffect(() => {
    handleClasses();
  }, [handleClasses]);

  return {classes};
};

export default useCarClass;
