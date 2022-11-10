import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 160 * 2,
    height: 90 * 2,
  },
});

const LoadingComponent: React.FC = () => {
  return (
    <SafeAreaView style={styles.root}>
      <FastImage
        source={{
          uri: 'https://prod.r3eassets.com/assets/content/carlivery/haribo-racing-team-88-6401-image-big.webp',
        }}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.img}
      />
      <ActivityIndicator size={'large'} />
    </SafeAreaView>
  );
};

export default LoadingComponent;
