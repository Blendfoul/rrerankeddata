import React, {useEffect, useState, useCallback} from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {useRaceStore} from '../../store/RaceContext';
import axios, {CancelTokenSource} from 'axios';
import Race from './Race';
import {Observer} from 'mobx-react-lite';
import {reaction} from 'mobx';

const RaceContainer: props => Node = ({navigation}) => {
  const raceStore = useRaceStore();
  const [refresh, setRefresh] = useState(true);

  const getRaces = useCallback(async () => {
    const source: CancelTokenSource = axios.CancelToken.source();
    setRefresh(true);

    try {
      const response = await axios('/multiplayer-rating/servers/', {
        cancelToken: source.token,
      });

      const ratings = await axios('multiplayer-rating/ratings.json', {
        cancelToken: source.token,
      });

      if (response.status === 200) {
        raceStore.setRaces(response.data.result);
        raceStore.setRatings(ratings.data);
        const sorted = response.data.result
          .filter(({Server}) =>
            Server.Settings.ServerName.includes(raceStore.Region),
          )
          .sort((a, b) => b.Server.PlayersOnServer > a.Server.PlayersOnServer);

        raceStore.setRegionRaces(sorted);
        setRefresh(false);
      }
    } catch (e) {
      console.error('[Race Container] ' + e.message);
    }

    setRefresh(false);

    return () => {
      source.cancel();
    };
  }, [raceStore]);

  reaction(
    () => raceStore.Region,
    () => {
      raceStore.setRegionRaces([]);

      const races = raceStore.Races;

      const sorted = races
        .filter(({Server}) =>
          Server.Settings.ServerName.includes(raceStore.Region),
        )
        .sort((a, b) => b.Server.PlayersOnServer > a.Server.PlayersOnServer);

      raceStore.setRegionRaces(sorted);
    },
  );

  useEffect(() => getRaces(), [getRaces]);

  return (
    <Observer>
      {() => (
        <FlatList
          data={raceStore.RegionRaces}
          renderItem={({item, index}) => (
            <Race
              data={item.Server}
              navigation={navigation}
              index={index}
              key={index}
            />
          )}
          keyExtractor={({item}, index) => index}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={getRaces} />
          }
        />
      )}
    </Observer>
  );
};

export default RaceContainer;
