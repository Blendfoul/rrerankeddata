import React from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet } from 'react-native';

import image from '../../assets/splash_icon.png';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 160 * 2,
    height: 90 * 2,
    marginBottom: 20,
  },
});

const LoadingComponent: React.FC = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Image
        source={image}
        resizeMode="contain"
        style={styles.img}
      />
      <ActivityIndicator size={'large'} />
    </SafeAreaView>
  );
};

export default LoadingComponent;
