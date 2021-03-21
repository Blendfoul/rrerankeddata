import React from 'react';
import {SafeAreaView, StyleSheet, Dimensions, ScrollView} from 'react-native';

import TrackImage from './TrackImage';
import SessionDetails from './SessionDetails';

const RaceDetailsScreen = ({route, navigation}) => {
  return (
    <SafeAreaView style={details.container}>
      <ScrollView>
        <TrackImage trackId={route.params.Server.Settings.TrackLayoutId[0]} />
        <SessionDetails session={route.params.Server} />
      </ScrollView>
    </SafeAreaView>
  );
};

const details = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#2f2f2f',
  },
});

export default RaceDetailsScreen;
