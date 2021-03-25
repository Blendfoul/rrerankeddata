import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TrackImage from './TrackImage';
import RaceDataInfo from './RaceDataInfo';
import axios from 'axios';
import TimesTable from './TimesTable';

const SessionDetailsScreen = ({route, navigation}) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const response = await axios(
        `https://raceroom.dhsh.tk/api/race/${route.params.hash}`,
      );

      console.log(
        response.data.Quali.filter(
          driver => driver.Username === route.params.username,
        ),
        route.params.username,
      );

      setInfo(response.data);
      setLoading(false);
    };

    getData();
  }, [route.params.hash, route.params.username]);

  return (
    <>
      <View style={styles.container}>
        <TrackImage trackId={route.params.track} />
        <View style={styles.containerView}>
          {loading ? null : (
            <>
              <RaceDataInfo info={info.RaceInfos} />
              <TimesTable info={info} />
            </>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2f2f',
  },
  containerView: {
    flex: 1,
  },
});

export default SessionDetailsScreen;
