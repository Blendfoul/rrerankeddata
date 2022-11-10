import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { ActionSheetIOS } from 'react-native';
import { useDispatch } from 'react-redux';
import { generalActions } from '../../store/slices/General';
import { useTranslation } from 'react-i18next';

const RegionPicker: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const options = [
    t('picker.cancel'),
    t('picker.region.all'),
    t('picker.region.europe'),
    t('picker.region.oceania'),
    t('picker.region.america'),
  ];

  const values = ['', '', 'Europe', 'Oceania', 'America'];

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
            dispatch(generalActions.setRegion(values[buttonIndex]));
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
