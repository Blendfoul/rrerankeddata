import React from 'react';
import {styles} from './Theme';
import {Dimensions, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
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
});

interface LoadingActivityProps {
  title: string;
}

const LoadingActivity: React.FC<LoadingActivityProps> = ({title}) => {
  return (
    <View style={styles.loadingContainer}>
      <Icon name={'car'} size={100} color={'#fff'} testID={'icon'} />
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
