import type {Profile} from './Profile';
import {ScrollView, StyleSheet} from 'react-native';
import DriverImage from './DriverImage';
import DriverDetails from './DriverDetails';
import React from 'react';
import DriverHistory from './DriverHistory';

export default function DriverComponent(props: {data: Profile}) {
  return (
    <ScrollView style={details.container}>
      <DriverImage data={props.data} />
      <DriverDetails data={props.data} />
      <DriverHistory data={props.data} navigation={props.navigation} />
    </ScrollView>
  );
}

const details = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2f2f',
  },
});
