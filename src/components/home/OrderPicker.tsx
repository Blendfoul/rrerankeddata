import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { batch, useDispatch } from 'react-redux';
import { useRaceSelector } from '../../store/hooks';
import { generalActions, orderSelector } from '../../store/slices/General';

const RegionPicker: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const state = useRaceSelector(orderSelector);

  const openPicker = () => {
    batch(() => {
      dispatch(generalActions.setOrder(!state));
    });
  };

  return (
    <>
      <IconButton
        icon={!state ? 'order-numeric-descending' : 'order-numeric-ascending'}
        color={colors.text}
        size={25}
        onPress={openPicker}
      />
    </>
  );
};

export default RegionPicker;
