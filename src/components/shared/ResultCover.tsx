import { StyleSheet, View } from 'react-native';
import ContentImage from './ContentImage';
import CarClass from './CarClass';
import CustomCardCover from './CustomCardCover';
import React from 'react';
import { Track } from '../../models/data/General';

const styles = StyleSheet.create({
  root: {
    margin: 5,
    elevation: 3,
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cover: {
    height: 125,
  },
  img: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

type Props = {
  trackInfo: Track;
  classes: number[];
};

const ResultCover: React.FC<Props> = ({ trackInfo, classes }) => {
  return (
    <CustomCardCover
      style={styles.cover}
      resizeMode={'cover'}
      source={{
        uri: `https://game.raceroom.com/store/image_redirect?id=${trackInfo.Id}&amp;size=big`,
      }}>
      <View
        style={[
          styles.imgContainer,
          { justifyContent: 'flex-start', flex: 1 },
        ]}>
        <View style={[styles.imgContainer, { flex: 0 }]}>
          <ContentImage
            source={{
              uri: `https://prod.r3eassets.com/assets/content/track/${trackInfo.Name.toLowerCase()
                .replaceAll(' ', '-')
                .replace('ü', 'u')}-${trackInfo.Id}-logo-original.webp`,
            }}
            resizeMode={'contain'}
            style={styles.img}
          />
        </View>
        <View style={[styles.imgContainer, { flex: 1 }]}>
          <CarClass
            classId={classes}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
          />
        </View>
      </View>
    </CustomCardCover>
  );
};

export default ResultCover;
