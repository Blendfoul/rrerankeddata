import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import axios from 'axios';
import {styles} from '../utils/Theme';
import DriverData from './DriverData';
import {useRaceStore} from '../../store/RaceContext';
import DriverImage from './DriverImage';

const DriverDetails = ({username}: {username: String}): React.Component => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const raceStore = useRaceStore();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getDetails = async () => {
      setLoading(true);
      const response = await axios(
        `https://game.raceroom.com/users/${username}/?json`,
        {cancelToken: source.token},
      );

      try {
        const rating = await axios(
          `https://game.raceroom.com/multiplayer-rating/user/${response.data.context.c.user_id}.json`,
          {cancelToken: source.token},
        );

        setData({data: response.data.context.c, rating: rating.data});
      } catch (e) {
        setData({
          data: response.data.context.c,
          rating: {
            Rating: 1700,
            Reputation: 70,
            RacesCompleted: 0,
          },
        });
      }

      setLoading(false);
    };

    getDetails();

    return () => source.cancel();
  }, [raceStore, username]);

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={'#fff'} />
    </View>
  ) : (
    <>
      <DriverImage data={data.data} />
      <ScrollView style={[styles.backgroundColor]}>
        <DriverData data={data} />
      </ScrollView>
    </>
  );
};

export default DriverDetails;
