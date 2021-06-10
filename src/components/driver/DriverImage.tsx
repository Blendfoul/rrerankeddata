import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {Avatar} from 'react-native-paper';
import {styles} from '../utils/Theme';
import {useRaceContext} from '../../store/RaceContext';

const DriverImage: React.FC<any> = ({data}) => {
  const [state] = useRaceContext();
  const focused = useIsFocused();

  useEffect(() => {}, [state.driver, focused]);

  return (
    <View style={[styles.root, componentStyle.viewContainer]}>
      <ImageBackground
        style={[componentStyle.backgroundContainer]}
        source={
          data.header === null
            ? require('../../assets/r3e.png')
            : {
                uri: data.header,
                cache: 'only-if-cached',
              }
        }>
        <Avatar.Image
          style={componentStyle.logo}
          source={
            data.avatar === null
              ? require('../../assets/r3e.png')
              : {
                  uri: data.avatar,
                  cache: 'only-if-cached',
                }
          }
        />
      </ImageBackground>
    </View>
  );
};

const componentStyle = StyleSheet.create({
  backgroundContainer: {
    width: '100%',
    height: 100,
  },
  logo: {
    marginTop: 15,
    marginStart: 25,
    backgroundColor: 'transparent',
  },
  viewContainer: {
    padding: 0,
    overflow: 'hidden',
  },
});

export default DriverImage;
