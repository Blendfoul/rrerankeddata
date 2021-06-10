import {useCallback, useEffect, useState} from 'react';
import {Rating} from '../types/rating';
import {useRaceContext} from '../store/RaceContext';

const useRating = () => {
  const [state] = useRaceContext();
  const [data, setData] = useState<Rating[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [first, setFirst] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const itemsPerPage = 50;
  const from1 = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const filterData = useCallback(() => {
    const temp: Rating[] = [];
    for (let index = from1; index < to; index++) {
      if (state.ratings.length === 0) {
        break;
      }

      if (state.defaultDriver && first) {
        const floor = Math.floor(
          state.ratings.findIndex(
            driver => driver.Username === state.defaultDriver,
          ) / 50,
        );

        setPage(floor);
        setFirst(false);
      }

      const driver = state.ratings[index];

      if (driver !== null) {
        temp.push(driver);
      }
    }

    setData(temp);
    setLoading(false);
  }, [first, from1, state.defaultDriver, state.ratings, to]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  const pageChange = (value: number) => setPage(value);

  return {data, loading, itemsPerPage, from1, to, page, pageChange};
};

export default useRating;
