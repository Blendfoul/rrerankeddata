import React, {useCallback, useEffect, useState} from 'react';
import {useRaceStore} from './store/RaceContext';
import axios from 'axios';
import DriverComponent from './DriverComponent';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/core';
import type {Profile} from './interfaces/Profile';
import {RaceTheme, styles} from './Theme';

const DefaultUser = ({route, navigation}) => {
  const raceStore = useRaceStore();
  const hasDefault = raceStore.DefaultDriver.length > 0;
  const [isLoading, setLoading] = useState(true);
  const [data, setData]: [Profile, (profile: Profile) => void] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getDriverData = async () => {
      if (raceStore.DefaultDriver.length > 0) {
        setLoading(true);
        try {
          const response = await axios(
            `https://game.raceroom.com/users/${raceStore.DefaultDriver}/career?json`,
            {cancelToken: source.token},
          );

          setData(response.data.context.c);
        } catch (e) {
          console.log(e);
        }

        setLoading(false);
      }
    };

    getDriverData();
    return () => source.cancel();
  }, [isFocused, raceStore.DefaultDriver]);

  const redirectSearch = useCallback(() => navigation.navigate('Search'), [
    navigation,
  ]);

  return hasDefault ? (
    isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={'#fff'} />
      </View>
    ) : (
      <DriverComponent data={data} navigation={navigation} />
    )
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
