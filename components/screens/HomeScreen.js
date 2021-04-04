import React from 'react';
import {StatusBar, StyleSheet, ImageBackground, View} from 'react-native';
import AreaPicker from '../race/AreaPicker';
import RaceContainer from '../race/RaceContainer';
import {styles} from '../utils/Theme';
//import {AdMobBanner} from 'react-native-admob';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.column}>
      <StatusBar />
      <AreaPicker />
      <ImageBackground
        source={require('../../assets/bg_home.png')}
        style={componentStyle.image}
        imageStyle={{opacity: 0.8}}>
        <RaceContainer navigation={navigation} />
      </ImageBackground>
    </View>
  );
};

const componentStyle = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default HomeScreen;
