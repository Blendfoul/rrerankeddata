import React, {useContext, useEffect, useState} from 'react';
import {styles} from './Theme';
import {ActivityIndicator, View} from 'react-native';
import TextContainer from './TextContainer';
import {LocalizationContext} from '../translations/LocalizationContext';

const LoadingActivity = () => {
  const {translations} = useContext(LocalizationContext);
  const [text, setText] = useState('');

  useEffect(() => {}, []);

  return (
    <View style={styles.loadingContainer}>
      <TextContainer
        title={<ActivityIndicator size={'large'} color={'#fff'} />}
        text={text}
      />
    </View>
  );
};

export default LoadingActivity;
