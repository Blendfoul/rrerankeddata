import React from 'react';
import ServerDetails from './ServerDetails';
import {View} from 'react-native';
import {styles} from '../utils/Theme';
import {AdMobBanner} from 'react-native-admob';

interface RaceServerProps {
  route: any;
}

const RaceServer: React.FC<RaceServerProps> = ({route}) => {
  const {data}: {data: string} = route.params;

  return (
    <View style={[styles.column, styles.backgroundColorTarget]}>
      <ServerDetails serverName={data} />
      <AdMobBanner
        adSize={'smartBannerPortrait'}
        adUnitID="ca-app-pub-3693871231832720/4221863534" //"ca-app-pub-3940256099942544/6300978111"
        onAdFailedToLoad={(error: Error) => console.error(error)}
      />
    </View>
  );
};

export default RaceServer;
