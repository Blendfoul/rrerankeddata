import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import OrderPicker from './OrderPicker';
import RegionPicker from './RegionPicker';
import SessionPicker from './SessionPicker';

const PickersComponent: React.FC = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: colors.background,
    },
  });

  return (
    <View style={styles.container}>
      <RegionPicker />
      <OrderPicker />
      <SessionPicker />
    </View>
  );
};

export default PickersComponent;
