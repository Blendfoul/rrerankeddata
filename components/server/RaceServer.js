import React from 'react';
import ServerDetails from './ServerDetails';
import {View} from 'react-native';
import {styles} from '../utils/Theme';
import TrackImage from '../utils/TrackImage';
import {AdMobBanner} from 'react-native-admob';
import {Observer} from 'mobx-react-lite';
import {useRaceStore} from '../../store/RaceContext';

const RaceServer = ({data, loading, navigation}) => {
  const raceStore = useRaceStore();

  console.log(data);

  const value = raceStore.RegionRaces.find(
    server => server.Server.Settings.ServerName === data,
  ).Server;

  return (
    <Observer>
      {() => (
        <View style={[styles.column, styles.backgroundColor]}>
          <TrackImage trackId={value.Settings.TrackLayoutId[0]} />
          <ServerDetails
            data={value}
            navigation={navigation}
            loading={loading}
          />
          <AdMobBanner
            adSize={'smartBannerPortrait'}
            adUnitID="ca-app-pub-3693871231832720/4221863534" //"ca-app-pub-3940256099942544/6300978111"
            onAdFailedToLoad={error => console.error(error)}
          />
        </View>
      )}
    </Observer>
  );
};

export default RaceServer;
