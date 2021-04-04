import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import TrackImage from '../utils/TrackImage';
import axios from 'axios';
import SessionsTable from '../session/SessionsTable';
import {styles} from '../utils/Theme';

const SessionDetailsScreen = ({route, navigation}) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getData = async () => {
      setLoading(true);

      try {
        const response = await axios(
          `https://raceroom.dhsh.tk/api/race/${route.params.hash}`,
        );

        setInfo(response.data);
      } catch (e) {
        console.error('[SessionDetails] ' + e.message);
      }
      setLoading(false);
    };

    getData();

    return () => source.cancel();
  }, [route.params.hash, route.params.username]);

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={'#fff'} />
    </View>
  ) : (
    <View style={[styles.column, styles.backgroundColor]}>
      <TrackImage trackId={route.params.track.Id} />
      <SessionsTable info={info} layoutId={route.params.track.Name} />
    </View>
  );
};

export default SessionDetailsScreen;
