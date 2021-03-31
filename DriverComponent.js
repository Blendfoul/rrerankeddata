import type {Profile, Race} from './interfaces/Profile';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import DriverImage from './DriverImage';
import DriverDetails from './DriverDetails';
import React, {useCallback, useEffect, useState} from 'react';
import DriverHistory from './DriverHistory';
import {styles} from './Theme';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';

interface RaceData {
  RacesCompleted: Number;
  Rating: Number;
  Reputation: Number;
  Races: Race[];
}

const DriverComponent = ({
  username,
  navigation,
}: {
  username: String,
  navigation: StackNavigationProp,
}) => {
  const [data, setData]: [Profile, (data: Profile) => void] = useState(null);
  const [raceData, setRaceData]: [
    RaceData,
    (raceData: RaceData) => void,
  ] = useState(null);
  const [refresh, setRefresh]: [Boolean, (refresh: Boolean) => void] = useState(
    true,
  );

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getData = async () => {
      setRefresh(true);

      const response = await axios(
        `https://game.raceroom.com/users/${username}/career?json`,
        {cancelToken: cancelToken.token},
      );

      const index =
        response.data.context.c.raceList.GetUserMpRatingProgressResult.Entries
          .length;

      const data1: Profile = {
        header: response.data.context.c.header,
        avatar: response.data.context.c.avatar,
        name: response.data.context.c.name,
        team: response.data.context.c.team,
        user_id: response.data.context.c.user_id,
        simbiner: response.data.context.c.simbiner,
        vip: response.data.context.c.vip,
      };

      const raceData1: RaceData = {
        RacesCompleted:
          response.data.context.c.raceList.GetUserMpRatingProgressResult
            .TotalEntries,
        Rating:
          response.data.context.c.raceList.GetUserMpRatingProgressResult
            .Entries[index - 1].RatingAfter,
        Reputation:
          response.data.context.c.raceList.GetUserMpRatingProgressResult
            .Entries[index - 1].ReputationAfter,
        Races:
          response.data.context.c.raceList.GetUserMpRatingProgressResult
            .Entries,
      };

      setData(data1);
      setRaceData(raceData1);

      setRefresh(false);
    };

    getData();

    return () =>
      cancelToken.cancel('[Driver Component] -> Component unmounted');
  }, [username]);

  const refreshUser = useCallback(async () => {
    setRefresh(true);
    const cancelToken = axios.CancelToken.source();

    const response = await axios(
      `https://game.raceroom.com/users/${username}/career?json`,
      {cancelToken: cancelToken.token},
    );

    const index =
      response.data.context.c.raceList.GetUserMpRatingProgressResult.Entries
        .length;

    const raceData1: RaceData = {
      RacesCompleted:
        response.data.context.c.raceList.GetUserMpRatingProgressResult
          .TotalEntries,
      Rating:
        response.data.context.c.raceList.GetUserMpRatingProgressResult.Entries[
          index - 1
        ].RatingAfter,
      Reputation:
        response.data.context.c.raceList.GetUserMpRatingProgressResult.Entries[
          index - 1
        ].ReputationAfter,
      Races:
        response.data.context.c.raceList.GetUserMpRatingProgressResult.Entries,
    };

    setRaceData(raceData1);
    setRefresh(false);
    return () =>
      cancelToken.cancel('[Driver Component] -> Component unmounted');
  }, [username]);

  return refresh ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={'#fff'} />
    </View>
  ) : (
    <ScrollView
      style={styles.backgroundColor}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={refreshUser} />
      }>
      <DriverImage data={data} />
      <DriverDetails data={data} raceData={raceData} />
      <DriverHistory raceData={raceData} navigation={navigation} />
    </ScrollView>
  );
};

export default DriverComponent;
