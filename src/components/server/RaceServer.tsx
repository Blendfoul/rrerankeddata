import React from 'react';
import ServerDetails from './ServerDetails';
import {View} from 'react-native';
import {styles} from '../utils/Theme';

interface RaceServerProps {
  route: any;
}

const RaceServer: React.FC<RaceServerProps> = ({route}) => {
  const {data}: {data: string} = route.params;

  return (
    <View style={[styles.column, styles.backgroundColorTarget]}>
      <ServerDetails serverName={data} />
    </View>
  );
};

export default RaceServer;
