import React from 'react';
import {IconButton, useTheme} from 'react-native-paper';
import {batch, useDispatch} from 'react-redux';
import {orderSelector, serverActions} from '../../store/slices/Server';
import {useRaceSelector} from '../../store/hooks';

const RegionPicker: React.FC = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const state = useRaceSelector(orderSelector);

  const openPicker = () => {
    batch(() => {
      dispatch(serverActions.setOrder(!state));
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
