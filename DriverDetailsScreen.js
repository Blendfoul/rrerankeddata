import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from 'react-native';

const DriverDetailsScreen = ({route, navigation}) => {
  return (
    <ScrollView>
      <ImageBackground
        style={details.backgroundContainer}
        source={{
          uri: '',
        }}>
        <Image
          style={details.logo}
          source={{
            uri: '',
          }}
        />
      </ImageBackground>
    </ScrollView>
  );
};

const details = StyleSheet.create({
  image: {
    height: 125,
    resizeMode: 'contain',
    backgroundColor: '#2f2f2f',
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

export default DriverDetailsScreen;
