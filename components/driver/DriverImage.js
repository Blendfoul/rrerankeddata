import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useRaceStore} from '../../store/RaceContext';
import {useIsFocused} from '@react-navigation/core';

function DriverImage({data}): React.Component {
  const raceStore = useRaceStore();
  const focused = useIsFocused();

  useEffect(() => {}, [raceStore.driver, focused]);

  return (
    <View style={componentStyle.view}>
      <ImageBackground
        style={componentStyle.backgroundContainer}
        source={
          data.header === null
            ? require('../../assets/r3e.png')
            : {
                uri: data.header,
              }
        }>
        <Image
          style={componentStyle.logo}
          source={
            data.avatar === null
              ? require('../../assets/r3e.png')
              : {
                  uri: data.avatar,
                }
          }
        />
      </ImageBackground>
    </View>
  );
}

const componentStyle = StyleSheet.create({
  image: {
    height: 125,
    resizeMode: 'contain',
    backgroundColor: '#2f2f2f',
  },
  view: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  backgroundContainer: {
    width: Dimensions.get('window').width,
    height: 125,
  },
  logo: {
    marginTop: 25,
    marginStart: 25,
    backgroundColor: 'rgba(0,0,0,0)',
    width: 75,
    height: 75,
  },
});

export default DriverImage;
