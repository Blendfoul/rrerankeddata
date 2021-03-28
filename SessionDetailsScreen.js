import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import TrackImage from './TrackImage';
import RaceDataInfo from './RaceDataInfo';
import axios from 'axios';
import TimesTable from './TimesTable';
import {styles} from './Theme';

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
      <View style={[styles.column, styles.backgroundColor]}>
        <TrackImage trackId={route.params.track} />
        <View style={styles.column}>
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

export default SessionDetailsScreen;
