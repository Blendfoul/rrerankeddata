import React, {useCallback} from 'react';
import {styles} from './Theme';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {ProgressBar, Text} from 'react-native-paper';

const useStyles = StyleSheet.create({
  progress: {
    height: 10,
    width: Dimensions.get('window').width * 0.8,
    textAlign: 'center',
    borderRadius: 5,
  },
  progressText: {
    paddingTop: 5,
    fontStyle: 'italic',
  },
  img: {
    height: 100,
    width: Dimensions.get('window').width * 0.85,
  },
});

interface LoadingActivityProps {
  title: string;
}

const LoadingActivity: React.FC<LoadingActivityProps> = ({title}) => {
  const id = useCallback(() => {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
      case 0:
        return require('../../assets/about/haribo_amg.webp');
      case 1:
        return require('../../assets/about/haribo_sls.webp');
      case 2:
        return require('../../assets/about/haribo_z06.webp');
    }
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <Image source={id()} resizeMode={'contain'} style={useStyles.img} />
      <ProgressBar
        indeterminate
        color={'#fff'}
        style={useStyles.progress}
        testID={'progress'}
      />
      <Text style={useStyles.progressText} testID={'title'}>
        {title}
      </Text>
    </View>
  );
};

export default LoadingActivity;
