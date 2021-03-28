import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import TrackImage from './TrackImage';
import SessionDetails from './SessionDetails';
import {styles} from './Theme';

const RaceDetailsScreen = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(false);

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={'#fff'} />
    </View>
  ) : (
    <ScrollView style={styles.backgroundColor}>
      <TrackImage trackId={route.params.Server.Settings.TrackLayoutId[0]} />
      <SessionDetails
        session={route.params.Server}
        navigation={navigation}
        loading={setLoading}
      />
    </ScrollView>
  );
};

export default RaceDetailsScreen;
