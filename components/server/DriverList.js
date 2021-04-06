import React, {useContext} from 'react';
import {DataTable} from 'react-native-paper';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import type {Driver} from '../../interfaces/Driver';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LocalizationContext} from '../translations/LocalizationContext';

const DriverList = props => {
  const {translations} = useContext(LocalizationContext);
  const onDriverPress = async (userId: Number) => {
    props.navigation.navigate(translations.navigation.driverDetails, userId);
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
      <ScrollView>
        {props.drivers.map((driver: Driver, index: Number) => (
          <Pressable onPress={() => onDriverPress(driver.Username)} key={index}>
            <DataTable.Row>
              <DataTable.Cell>{driver.Fullname}</DataTable.Cell>
              <DataTable.Cell numeric>{driver.Reputation}</DataTable.Cell>
              <DataTable.Cell numeric>{driver.Rating}</DataTable.Cell>
            </DataTable.Row>
          </Pressable>
        ))}
      </ScrollView>
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
