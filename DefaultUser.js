import React, {useCallback, useEffect} from 'react';
import {useRaceStore} from './store/RaceContext';
import DriverComponent from './DriverComponent';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {styles} from './Theme';
import {useIsFocused} from '@react-navigation/core';

const DefaultUser = ({route, navigation}) => {
  const raceStore = useRaceStore();
  const hasDefault = raceStore.DefaultDriver.length > 0;
  const focused = useIsFocused();

  useEffect(() => {}, [focused, raceStore.DefaultDriver]);

  const redirectSearch = useCallback(() => navigation.navigate('Search'), [
    navigation,
  ]);

  return hasDefault ? (
    <DriverComponent
      username={raceStore.DefaultDriver}
      navigation={navigation}
    />
  ) : (
    <View
      style={[
        styles.column,
        styles.alignCenter,
        styles.justifyCenter,
        styles.backgroundColor,
      ]}>
      <Text style={styles.title}>Bummer</Text>
      <Text style={[styles.text, styles.paddingVertical5]}>No driver set!</Text>
      <Button
        buttonStyle={componentStyle.setButton}
        onPress={redirectSearch}
        title={'Search '}
        iconRight
        icon={<AntIcon name={'user'} size={25} color={'#fff'} />}
      />
    </View>
  );
};

const componentStyle = StyleSheet.create({
  setButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: 150,
    height: 50,
  },
});

export default DefaultUser;
