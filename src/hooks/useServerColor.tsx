import {useEffect, useState} from 'react';
import {ServerDataSettings} from '../models/data/Ranked';
import {useSelector} from 'react-redux';
import useRanked from './useRanked';
import {idSelector} from '../store/slices/DefaultUser';

const useServerColor = (settings: ServerDataSettings, drivers: number[]) => {
  const user = useSelector(idSelector);
  const {rating} = useRanked(user);
  const [color, setColor] = useState<string>('');

  const getServerColor = () => {
    if (!user) {
      return;
    }

    if (
      (rating?.Rating as number) < settings.MinRating ||
      (rating?.Reputation as number) < settings.MinReputation
    ) {
      setColor('#BA74EF');
    } else {
      const inRace = drivers.find(us => us === user);
      if (inRace) {
        setColor('grey');
      }
    }
  };

  useEffect(() => {
    getServerColor();
  }, [user]);

  return {color};
};

export default useServerColor;
