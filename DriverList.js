import React from 'react';
import {DataTable} from 'react-native-paper';
import {Pressable, StyleSheet} from 'react-native';
import type {Driver} from './interfaces/Driver';
import {useRaceStore} from './store/RaceContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const DriverList = props => {
  const raceStore = useRaceStore();
  const onDriverPress = async (userId: Number) => {
    props.loading(true);
    raceStore.setSearchDriver(userId);
    const source = axios.CancelToken.source();

    try {
      const response = await axios(
        `https://game.raceroom.com/users/${userId}/career?json`,
        {
          cancelToken: source.token,
        },
      );

      if (response.status === 200) {
        props.loading(false);
        props.navigation.navigate('Driver Details', response.data.context.c);
      }
    } catch (e) {
      props.loading(false);
    }

    return () => {
      source.cancel();
    };
  };
  return (
    <DataTable style={componentStyle.container}>
      <DataTable.Header>
        <DataTable.Title>
          <AntDesign name={'user'} color={'white'} size={25} />
        </DataTable.Title>
        <DataTable.Title numeric>
          <AntDesign name={'exception1'} color={'white'} size={25} />
        </DataTable.Title>
        <DataTable.Title numeric>
          <AntDesign name={'solution1'} color={'white'} size={25} />
        </DataTable.Title>
      </DataTable.Header>
      {props.drivers.map((driver: Driver, index: Number) => (
        <Pressable onPress={() => onDriverPress(driver.Username)} key={index}>
          <DataTable.Row>
            <DataTable.Cell>{driver.Fullname}</DataTable.Cell>
            <DataTable.Cell numeric>{driver.Reputation}</DataTable.Cell>
            <DataTable.Cell numeric>{driver.Rating}</DataTable.Cell>
          </DataTable.Row>
        </Pressable>
      ))}
    </DataTable>
  );
};

const componentStyle = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
  },
  image: {
    flex: 1,
    width: 25,
    height: 25,
  },
});

export default DriverList;
