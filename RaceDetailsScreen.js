import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import TrackImage from './TrackImage';
import SessionDetails from './SessionDetails';

const RaceDetailsScreen = ({route, navigation}) => {
  return (
    <ScrollView style={details.container}>
      <TrackImage trackId={route.params.Server.Settings.TrackLayoutId[0]} />
      <SessionDetails session={route.params.Server} navigation={navigation} />
    </ScrollView>
  );
};

const details = StyleSheet.create({
  container: {
    backgroundColor: '#2f2f2f',
  },
});

export default RaceDetailsScreen;
