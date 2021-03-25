import React, {useCallback, useEffect, useState} from 'react';
import {useRaceStore} from './RaceContext';
import axios from 'axios';
import DriverComponent from './DriverComponent';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/core';
import type {Profile} from './Profile';

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
      <View style={style.container}>
        <ActivityIndicator size={'large'} color={'#fff'} />
      </View>
    ) : (
      <DriverComponent data={data} navigation={navigation} />
    )
  ) : (
    <View style={style.container}>
      <Text style={style.heading}>Bummer</Text>
      <Text style={style.text}>No driver set!</Text>
      <Button
        buttonStyle={style.setButton}
        onPress={redirectSearch}
        title={'Search '}
        iconRight
        icon={<AntIcon name={'user'} size={25} color={'#fff'} />}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f2f2f',
    height: '100%',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  setButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: 150,
    height: 50,
  },
});

export default DefaultUser;
