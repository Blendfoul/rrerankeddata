import React from 'react';
import {DataTable} from 'react-native-paper';
import {Pressable, StyleSheet} from 'react-native';
import type {Driver} from './Driver';

const DriverList = props => {
  const onDriverPress = (id: Number) => {
    props.navigation.navigate('Driver Details', id);
  };
  return (
    <DataTable style={style.container}>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>Rating</DataTable.Title>
        <DataTable.Title numeric>Reputation</DataTable.Title>
      </DataTable.Header>
      {props.drivers.map((driver: Driver, index: Number) => (
        <Pressable onPress={() => onDriverPress(driver.UserId)} key={index}>
          <DataTable.Row>
            <DataTable.Cell>{driver.Fullname}</DataTable.Cell>
            <DataTable.Cell numeric>{driver.Rating}</DataTable.Cell>
            <DataTable.Cell numeric>{driver.Reputation}</DataTable.Cell>
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
