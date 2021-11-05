import React from 'react';
import {IconButton, useTheme} from 'react-native-paper';
import {ActionSheetIOS} from 'react-native';
import {useDispatch} from 'react-redux';
import {generalActions} from '../../store/slices/General';

const RegionPicker: React.FC = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const options = ['Cancel', 'All', 'Europe', 'Oceania', 'America'];

  const openPicker = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex !== 0) {
          if (buttonIndex === 1) {
            dispatch(generalActions.setRegion(''));
          } else {
            dispatch(generalActions.setRegion(options[buttonIndex]));
          }
        }
      },
    );
  };

  return (
    <>
      <IconButton
        icon={'map-marker-outline'}
        color={colors.text}
        size={25}
        onPress={openPicker}
      />
    </>
  );
};

export default RegionPicker;
