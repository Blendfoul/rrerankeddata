import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import type {Profile} from './interfaces/Profile';

function DriverImage(props: {data: Profile}) {
  return (
    <View style={componentStyle.view}>
      <ImageBackground
        style={componentStyle.backgroundContainer}
        source={
          props.data.header === undefined
            ? require('./assets/r3e.jpg')
            : {
                uri: props.data?.header,
              }
        }>
        <Image
          style={componentStyle.logo}
          source={{
            uri: props.data?.avatar,
          }}
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
