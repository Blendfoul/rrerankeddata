import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { ActionSheetIOS, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { generalActions } from '../../store/slices/General';
import { useTranslation } from 'react-i18next';

const RegionPicker: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const options = [
    t('picker.cancel'),
    t('picker.session.all'),
    t('picker.session.practice'),
    t('picker.session.qualification'),
    t('picker.session.race'),
  ];
  const values = [-1, 0, 256, 768];

  const openPicker = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex !== 0) {
            dispatch(generalActions.setSession(values[buttonIndex - 1]));
          }
        },
      );
    } else {
    }
  };

  return (
    <>
      <IconButton
        icon={'clock-outline'}
        color={colors.text}
        size={25}
        onPress={openPicker}
      />
    </>
  );
};

export default RegionPicker;
