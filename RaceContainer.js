import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useRaceStore} from './RaceContext';
import axios, {CancelTokenSource} from 'axios';
import Race from './Race';
import type {Server} from './Server';
import {Observer} from 'mobx-react-lite';
import {autorun} from 'mobx';

const RaceContainer: props => Node = props => {
  const raceStore = useRaceStore();
  const [isLoading, setLoading] = useState(true);
  const [region, setRegion] = useState([]);
  useEffect(() => {
    const source: CancelTokenSource = axios.CancelToken.source();

    const getRaces = async () => {
      try {
        setLoading(true);
        const response = await axios(
          'https://game.raceroom.com/multiplayer-rating/servers/',
          {cancelToken: source.token},
        );

        if (response.status === 200) {
          raceStore.setRaces(response.data.result);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
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

  return isLoading ? (
    <View style={styles.activity}>
      <ActivityIndicator size="large" color={'#fff'} />
    </View>
  ) : (
    <Observer>
      {() => (
        <ScrollView style={styles.container}>
          {region.map((server: Server, index: Number) => (
            <Race data={server} key={index} navigation={props.navigation} />
          ))}
        </ScrollView>
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
