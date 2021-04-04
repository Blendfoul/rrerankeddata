import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import TrackImage from '../utils/TrackImage';
import RaceServer from '../server/RaceServer';
import {styles} from '../utils/Theme';

const RaceDetailsScreen = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(false);

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={'#fff'} />
    </View>
  ) : (
    <View style={[styles.column, styles.backgroundColor]}>
      <TrackImage trackId={route.params.Server.Settings.TrackLayoutId[0]} />
      <RaceServer
        session={route.params.Server}
        navigation={navigation}
        loading={setLoading}
      />
    </View>
  );
};

export default RaceDetailsScreen;
