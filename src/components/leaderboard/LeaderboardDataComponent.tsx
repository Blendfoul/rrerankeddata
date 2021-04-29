import React, {useCallback, useEffect} from 'react';
import {useRaceStore} from '../../store/RaceContext';
import axios from 'axios';
import {CareerProfile} from '../../types/careerProfile';
import {Result} from '../../types/results';

interface DataProps {
  route: {
    params: {
      classId: number;
      trackId: number;
    };
  };
}

const LeaderboardDataComponent: React.FC<DataProps> = ({route}) => {
  const raceStore = useRaceStore();

  const fetchUserData = useCallback(async () => {
    const activeUsers = raceStore.Ratings.filter(
      driver => driver.ActivityPoints === 5,
    );

    const source = axios.CancelToken.source();

    const raceData = await Promise.all(
      activeUsers.map(async user => {
        try {
          const response = await axios(`users/${user.Username}/career?json`, {
            cancelToken: source.token,
          });

          const races: CareerProfile = response.data.context.c;

          if (races.raceList.Entries.length > 0) {
            return races.raceList.Entries.filter(
              (race: Result) =>
                race.TrackLayoutId.Id === route.params.trackId &&
                race.CarClasses.find(
                  carClass => carClass.Id === route.params.classId,
                )?.Id === route.params.classId,
            ).map((race: Result) => race.RaceHash);
          } else {
            return null;
          }
        } catch (e) {
          if (axios.isCancel(e)) {
          } else {
            console.error('[FETCH_RACE_HASH] ' + e);
            return null;
          }
        }
      }),
    );

    console.log(raceData);
  }, [raceStore.Ratings, route.params.classId, route.params.trackId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return null;
};

export default LeaderboardDataComponent;
