import {useCallback, useEffect, useState} from 'react';
import {Rating} from '../models/data/Ranked';
import axios from 'axios';

const useRanked = (id: number) => {
  const [rating, setRating] = useState<Rating>();

  const fetchRating = useCallback(async () => {
    try {
      const response = await axios(
        `https://game.raceroom.com/multiplayer-rating/user/${id}.json`,
      );

      setRating(response.data);
    } catch (e) {}
  }, [id]);

  useEffect(() => {
    fetchRating();
  }, [id]);

  return {rating};
};

export default useRanked;
