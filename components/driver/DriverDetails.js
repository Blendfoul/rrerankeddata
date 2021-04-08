import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import axios from 'axios';
import {styles} from '../utils/Theme';
import DriverData from './DriverData';
import {useRaceStore} from '../../store/RaceContext';
import DriverImage from './DriverImage';
import {useIsFocused} from '@react-navigation/core';

const DriverDetails = ({username}: {username: String}): React.Component => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const raceStore = useRaceStore();
  const isFocused = useIsFocused();

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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getUpdatedRating = async () => {
      try {
        const rating = await axios(
          `https://game.raceroom.com/multiplayer-rating/user/${data.data.user_id}.json`,
          {cancelToken: source.token},
        );

        setData(...data, {rating: rating.data});
      } catch (e) {
        setData({
          ...data,
          rating: {
            Rating: 1700,
            Reputation: 70,
            RacesCompleted: 0,
          },
        });
      }
    };

    if (raceStore.DefaultDriver === data?.data.username && data !== null) {
      getUpdatedRating();
    }

    return () => source.cancel();
  }, [data, isFocused, raceStore.DefaultDriver]);

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
