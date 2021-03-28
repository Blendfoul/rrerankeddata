import React from 'react';
import {StatusBar, StyleSheet, ImageBackground, View} from 'react-native';
import AreaPicker from './AreaPicker';
import RaceContainer from './RaceContainer';
import {styles} from './Theme';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.column}>
      <StatusBar />
      <AreaPicker />
      <ImageBackground
        source={require('./assets/bg_home.png')}
        style={componentStyle.image}
        imageStyle={{opacity: 0.5}}>
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
