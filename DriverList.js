import React from 'react';
import {DataTable} from 'react-native-paper';
import {Pressable, StyleSheet} from 'react-native';
import type {Driver} from './interfaces/Driver';
import {useRaceStore} from './store/RaceContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DriverList = props => {
  const raceStore = useRaceStore();
  const onDriverPress = (userId: Number) => {
    raceStore.setSearchDriver(userId);
    props.navigation.navigate('Driver Details', userId);
  };
  return (
    <DataTable style={style.container}>
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

const style = StyleSheet.create({
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
