import React from 'react';
import {StatusBar, StyleSheet, ImageBackground, View} from 'react-native';
import AreaPicker from '../race/AreaPicker';
import RaceContainer from '../race/RaceContainer';
import {styles} from '../utils/Theme';
import LanguagePicker from '../race/LanguagePicker';
import {AdMobBanner} from 'react-native-admob';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.column}>
      <StatusBar />
      <View style={[styles.row, {flex: 0}]}>
        <View style={{flex: 1.5}}>
          <LanguagePicker />
        </View>
        <View style={{flex: 3}}>
          <AreaPicker />
        </View>
      </View>
      <ImageBackground
        source={require('../../assets/bg_home.png')}
        style={componentStyle.image}
        imageStyle={{opacity: 0.8}}>
        <RaceContainer navigation={navigation} />
      </ImageBackground>
      <AdMobBanner
        adSize={'smartBannerPortrait'}
        adUnitID="ca-app-pub-3693871231832720/1409720136" //"ca-app-pub-3940256099942544/6300978111"
        onAdFailedToLoad={error => console.error(error)}
      />
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
