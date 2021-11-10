import {useCallback, useEffect, useState} from 'react';
import {Rating} from '../models/data/Ranked';
import axios from 'axios';

const useRanked = (id: number) => {
  const [rating, setRating] = useState<Rating>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRating = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios(
        `https://game.raceroom.com/multiplayer-rating/user/${id}.json`,
      );

      setRating(response.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRating();
  }, [id]);

  return {rating, loading};
};

export default useRanked;
