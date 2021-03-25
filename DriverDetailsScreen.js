import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import axios from 'axios';
import DriverComponent from './DriverComponent';
import {useRaceStore} from './RaceContext';

const DriverDetailsScreen = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const raceStore = useRaceStore();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getDriverData = async () => {
      setLoading(true);
      try {
        const response = await axios(
          `https://game.raceroom.com/users/${route.params}/career?json`,
          {cancelToken: source.token},
        );

        setData(response.data.context.c);
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
      raceStore.setRefresh(false);
    };

    getDriverData();

    return () => source.cancel();
  }, [route.params, raceStore.Refresh]);

  return isLoading ? (
    <View style={details.backgroundContainer}>
      <ActivityIndicator size={'large'} color={'#fff'} />
    </View>
  ) : (
    <DriverComponent data={data} navigation={navigation} />
  );
};

const details = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#2f2f2f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DriverDetailsScreen;
