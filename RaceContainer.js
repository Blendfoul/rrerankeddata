import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  RefreshControl,
  FlatList,
} from 'react-native';
import {useRaceStore} from './store/RaceContext';
import axios, {CancelTokenSource} from 'axios';
import Race from './Race';
import type {Server} from './interfaces/Server';
import {autorun} from 'mobx';
import {Observer} from 'mobx-react-lite';

const RaceContainer: props => Node = props => {
  const raceStore = useRaceStore();
  const [region, setRegion] = useState([]);

  useEffect(() => {
    const source: CancelTokenSource = axios.CancelToken.source();

    const getRaces = async () => {
      try {
        const response = await axios(
          'https://game.raceroom.com/multiplayer-rating/servers/',
          {cancelToken: source.token},
        );

        if (response.status === 200) {
          raceStore.setRaces(response.data.result);
          raceStore.setRefresh(false);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getRaces();

    return () => {
      source.cancel();
    };
  }, [raceStore]);

  useEffect(() => {
    autorun(() =>
      setRegion(
        raceStore.Races.filter((server: Server) =>
          server.Server.Settings.ServerName.includes(raceStore.Region),
        ),
      ),
    );
  }, [raceStore, raceStore.Region]);

  const onRefresh = useCallback(async () => {
    raceStore.setRefresh(true);

    const source: CancelTokenSource = axios.CancelToken.source();

    try {
      const response = await axios(
        'https://game.raceroom.com/multiplayer-rating/servers/',
        {cancelToken: source.token},
      );

      if (response.status === 200) {
        raceStore.setRaces(response.data.result);
        raceStore.setRefresh(false);
      }
    } catch (e) {
      console.error(e);
    }

    return () => {
      source.cancel();
    };
  }, [raceStore]);

  return (
    <Observer>
      {() => (
        <FlatList
          data={region}
          renderItem={server => (
            <Race data={server} navigation={props.navigation} />
          )}
          keyExtractor={(server: Server) => server.Server.Settings.ServerName}
          refreshControl={
            <RefreshControl
              refreshing={raceStore.Refresh}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={styles.list}
        />
      )}
    </Observer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activity: {
    height: Dimensions.get('window').height - StatusBar.currentHeight,
    backgroundColor: '#2f2f2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RaceContainer;
