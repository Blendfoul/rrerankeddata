import {useCallback, useEffect, useState} from 'react';
import {ServerDataSettings} from '../types/server';

interface RaceType {
  value: string;
  color: string;
  image: number;
}

const useRaceType = (data: ServerDataSettings) => {
  const [name, setName] = useState<string | null>(null);
  const [raceType, setRaceType] = useState<RaceType>({
    value: '',
    color: '',
    image: 0,
  });

  const computeType = useCallback(() => {
    setName(data.ServerName.replace('Rookie', ''));
    setName(data.ServerName.replace('Long', ''));
    if (data.MinReputation === 0) {
      setRaceType({
        value: 'Rookie',
        color: '#619367',
        image: require('../assets/rookie.png'),
      });
    } else if (data.ServerName.includes('Long')) {
      setRaceType({
        value: 'Longer Race',
        color: '#5F6A84',
        image: require('../assets/long.png'),
      });
    } else if (data.MinRating >= 1700) {
      setRaceType({
        value: 'Weekly 🥇',
        color: '#FFD700',
        image: require('../assets/special.png'),
      });
    } else if (data.MinRating >= 1600) {
      setRaceType({
        value: 'weekly 🥈',
        color: '#C0C0C0',
        image: require('../assets/special.png'),
      });
    } else if (data.ServerName.includes('BRONZE')) {
      setRaceType({
        value: 'Weekly 🥉',
        color: '#CD7F32',
        image: require('../assets/special.png'),
      });
    } else {
      if (data.MinReputation < 80) {
        setRaceType({
          value: 'Daily Sprint',
          color: '#767676',
          image: require('../assets/am.png'),
        });
      } else {
        setRaceType({
          value: 'Daily Sprint',
          color: '#767676',
          image: require('../assets/pro.png'),
        });
      }
    }
  }, [data.ServerName, data.MinReputation, data.MinRating]);

  useEffect(() => {
    computeType();
  }, [computeType]);

  return {name, raceType};
};

export default useRaceType;
