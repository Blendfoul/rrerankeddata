import {useCallback, useEffect, useState} from 'react';
import {ServerDataSettings} from '../types/server';

interface RaceType {
  value: string;
  color: string;
}

const useRaceType = (data: ServerDataSettings) => {
  const [name, setName] = useState<string>('');
  const [raceType, setRaceType] = useState<RaceType>({value: '', color: ''});

  const computeType = useCallback(() => {
    setName(data.ServerName.replace('Rookie', ''));

    if (data.MinReputation === 0) {
      setRaceType({value: 'Rookie', color: '#619367'});
    } else if (data.ServerName.includes('Long')) {
      setRaceType({value: 'Longer Race', color: '#5F6A84'});
    } else if (data.MinRating >= 1700) {
      setRaceType({value: 'Weekly 🥇', color: '#5F6A84'});
    } else if (data.MinRating >= 1600) {
      setRaceType({value: 'weekly 🥈', color: '#5F6A84'});
    } else if (data.ServerName.includes('BRONZE')) {
      setRaceType({value: 'Weekly 🥉', color: '#5F6A84'});
    } else {
      setRaceType({value: 'Daily Sprint', color: '#767676'});
    }
  }, [data.ServerName, data.MinReputation, data.MinRating]);

  useEffect(() => {
    computeType();
  }, [computeType]);

  return {name, raceType};
};

export default useRaceType;
