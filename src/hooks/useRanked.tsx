import { use, useCallback, useEffect } from 'react';

import { Rating } from '../models/data/Ranked';

const useRanked = (id: number) => {
  const abortSignal = new AbortController();

  const fetchRating = useCallback(
    async (AbortController: AbortController) => {
      if (id === -1) {
        return;
      }

      try {
        const response = await fetch(
          `https://game.raceroom.com/multiplayer-rating/user/${id}.json`,
          {
            signal: abortSignal.signal,
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = (await response.json()) as Rating;

        return data;
      } catch {}
    },
    [id],
  );

  useEffect(() => {
    return () => {
      abortSignal.abort();
    };
  }, [id]);

  const rating = use(fetchRating(abortSignal));

  return { rating };
};

export default useRanked;
