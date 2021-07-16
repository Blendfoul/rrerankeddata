import React, {useEffect, useState} from 'react';
import {Caption} from 'react-native-paper';

const RaceClock: React.FC<{time: number}> = ({time}) => {
  const [counter, setCounter] = useState<number>(time);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
        setHours(
          Math.floor((counter % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );
        setMinutes(Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((counter % (1000 * 60)) / 1000));
      }, 1000);

    if (timer !== false) {
      return () => clearInterval(timer);
    }
  }, [counter]);

  return (
    <Caption>
      {hours}:{minutes}:{seconds}
    </Caption>
  );
};

export default RaceClock;
