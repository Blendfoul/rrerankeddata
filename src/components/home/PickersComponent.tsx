import React from 'react';
import { StyleSheet, View } from 'react-native';
import RegionPicker from './RegionPicker';
import OrderPicker from './OrderPicker';
import SessionPicker from './SessionPicker';
import { useTheme } from 'react-native-paper';

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
