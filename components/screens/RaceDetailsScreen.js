import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import TrackImage from '../utils/TrackImage';
import RaceServer from '../server/RaceServer';
import {styles} from '../utils/Theme';
import {AdMobBanner} from 'react-native-admob';

const RaceDetailsScreen = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(false);

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={'#fff'} />
    </View>
  ) : (
    <>
      <View style={[styles.column, styles.backgroundColor]}>
        <TrackImage trackId={route.params.Server.Settings.TrackLayoutId[0]} />
        <RaceServer
          session={route.params.Server}
          navigation={navigation}
          loading={setLoading}
        />
        <AdMobBanner
          adSize={'smartBannerPortrait'}
          adUnitID="ca-app-pub-3693871231832720/4221863534" //"ca-app-pub-3940256099942544/6300978111"
          onAdFailedToLoad={error => console.error(error)}
        />
      </View>
    </>
  );
};

export default RaceDetailsScreen;
