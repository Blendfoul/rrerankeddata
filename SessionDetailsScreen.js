import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import TrackImage from './TrackImage';
import axios from 'axios';
import TimesTable from './TimesTable';
import {styles} from './Theme';

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

  return (
    <View style={[styles.column, styles.backgroundColor]}>
      <TrackImage trackId={route.params.track} />
      <View style={styles.column}>
        {loading ? null : <TimesTable info={info} />}
      </View>
    </View>
  );
};

export default SessionDetailsScreen;
