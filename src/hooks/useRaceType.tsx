import {useCallback, useEffect, useState} from 'react';
import {ServerDataSettings} from '../models/data/Ranked';

interface RaceType {
  value: string;
  image: number;
}

const useRaceType = (data: ServerDataSettings) => {
  const [name, setName] = useState<string | null>(null);
  const [raceType, setRaceType] = useState<RaceType>({
    value: '',
    image: 0,
  });

  const computeType = useCallback(() => {
    setName(data.ServerName.replace('Rookie', ''));
    setName(data.ServerName.replace('Long', ''));
    if (data.MinReputation === 0) {
      setRaceType({
        value: 'Rookie',
        image: require('../assets/sessions/rookie.png'),
      });
    } else if (data.ServerName.includes('Long')) {
      setRaceType({
        value: 'Longer Race',
        image: require('../assets/sessions/long.png'),
      });
    } else if (data.MinRating >= 1700) {
      setRaceType({
        value: 'Weekly 🥇',
        image: require('../assets/sessions/special.png'),
      });
    } else if (data.MinRating >= 1600) {
      setRaceType({
        value: 'weekly 🥈',
        image: require('../assets/sessions/special.png'),
      });
    } else if (data.ServerName.includes('BRONZE')) {
      setRaceType({
        value: 'Weekly 🥉',
        image: require('../assets/sessions/special.png'),
      });
    } else {
      if (data.MinReputation < 80) {
        setRaceType({
          value: 'Daily Sprint',
          image: require('../assets/sessions/am.png'),
        });
      } else {
        setRaceType({
          value: 'Daily Sprint',
          image: require('../assets/sessions/pro.png'),
        });
      }
    }
  }, []);

  useEffect(() => {
    computeType();
  }, []);

  return {name, raceType};
};

export default useRaceType;
