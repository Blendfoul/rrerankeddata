import { useCallback, useEffect, useState } from 'react';
import { Rating } from '../models/data/Ranked';
import axios from 'axios';

const useSof = (driversId: number[]) => {
  const [sof, setSof] = useState<number>(0);
  const [rep, setRep] = useState<number>(0);

  const calculate = useCallback(async () => {
    const ratings1: Rating[] = await Promise.all(
      driversId.map(async id => {
        if (id === -1) {
          return {
            Rating: 1500,
            Reputation: 70,
          } as Rating;
        }

        try {
          const response = await axios(
            `https://game.raceroom.com/multiplayer-rating/user/${id}.json`,
          );

          return response.data;
        } catch (e) {
          return {
            Rating: 1500,
            Reputation: 70,
          } as Rating;
        }
      }),
    );

    if (ratings1.length) {
      setSof(
        +(
          ratings1.map(driver => driver.Rating).reduce((a, b) => a + b) /
          ratings1.length
        ).toFixed(2),
      );

      setRep(
        +(
          ratings1.map(driver => driver.Reputation).reduce((a, b) => a + b) /
          ratings1.length
        ).toFixed(2),
      );
    } else {
      setSof(1500);
      setRep(70);
    }
  }, []);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return { sof, rep };
};

export default useSof;
