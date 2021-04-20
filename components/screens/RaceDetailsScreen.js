import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import RaceServer from '../server/RaceServer';
import {styles} from '../utils/Theme';

const RaceDetailsScreen = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(false);

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={'#fff'} />
    </View>
  ) : (
    <RaceServer
      data={route.params}
      navigation={navigation}
      loading={setLoading}
    />
  );
};

export default RaceDetailsScreen;
