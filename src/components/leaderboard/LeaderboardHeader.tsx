import React from 'react';
import TrackImage from '../utils/TrackImage';
import {styles} from '../utils/Theme';
import {View} from 'react-native';

interface HeaderProps {
  trackId: number;
  classId: number;
}

const LeaderboardHeader: React.FC<HeaderProps> = ({trackId, classId}) => {
  return (
    <View style={[styles.container, {overflow: 'hidden', padding: 0}]}>
      <TrackImage trackId={trackId} logoImage={classId} />
    </View>
  );
};

export default LeaderboardHeader;
