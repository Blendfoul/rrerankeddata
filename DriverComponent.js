import type {Profile} from './interfaces/Profile';
import {ScrollView} from 'react-native';
import DriverImage from './DriverImage';
import DriverDetails from './DriverDetails';
import React from 'react';
import DriverHistory from './DriverHistory';
import {styles} from './Theme';

export default function DriverComponent(props: {data: Profile}) {
  return (
    <ScrollView style={styles.backgroundColor}>
      <DriverImage data={props.data} />
      <DriverDetails data={props.data} />
      <DriverHistory data={props.data} navigation={props.navigation} />
    </ScrollView>
  );
}
