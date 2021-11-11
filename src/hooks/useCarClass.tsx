import {useCallback, useEffect, useState} from 'react';
import {useRaceSelector} from '../store/hooks';
import {dataSelector} from '../store/slices/General';
import {Livery} from '../models/data/General';

const useCarClass = (classId?: number[], liveries?: number[]) => {
  const [carClasses, setClasses] = useState<number[]>([]);
  const {cars} = useRaceSelector(dataSelector);

  const wellKnownClasses = (value: number) => {
    switch (value) {
      case 1703:
      case 7278:
      case 7767:
      case 4516:
      case 2922:
      case 3375:
        return 1703;
      default:
        return value;
    }
  };

  const handleClasses = useCallback(() => {
    if (classId !== undefined) {
      const values = classId.map(id => wellKnownClasses(id));
      const classAvailable = new Set(values);
      setClasses([...classAvailable] as number[]);
    } else {
      const liveryArray = liveries;
      const classAvailable = new Set();
      if (liveryArray !== undefined) {
        liveryArray.forEach(value => {
          for (const key in cars) {
            if (cars.hasOwnProperty(key)) {
              //@ts-ignore
              const data: Livery = cars[key].liveries.find(
                (val: {Id: number}) => value === val.Id,
              );
              if (data !== undefined) {
                classAvailable.add(wellKnownClasses(data.Class));
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

  return {classes: carClasses};
};

export default useCarClass;
