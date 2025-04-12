import React from 'react';

import { ActivityIndicator, Image, SafeAreaView, StyleSheet } from 'react-native';

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
      <Image
        source={{
          uri: 'https://prod.r3eassets.com/assets/content/carlivery/haribo-racing-team-88-6401-image-big.webp',
        }}
        resizeMode="contain"
        style={styles.img}
      />
      <ActivityIndicator size={'large'} />
    </SafeAreaView>
  );
};

export default LoadingComponent;
