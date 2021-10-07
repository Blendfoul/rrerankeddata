import React from 'react';
import {
  IconButton,
  useTheme,
  Dialog,
  Portal,
  RadioButton,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {regionSelector, serverActions} from '../../store/slices/Server';
import {useTranslation} from 'react-i18next';

const RegionPicker: React.FC = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const region = useSelector(regionSelector);
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <>
      <IconButton
        icon={'map-marker-outline'}
        color={colors.text}
        size={25}
        onPress={showDialog}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={value => {
                dispatch(serverActions.setRegion(value));
                hideDialog();
              }}
              value={region}>
              <RadioButton.Item label={t('race.regions.all')} value="" />
              <RadioButton.Item
                label={t('race.regions.europe')}
                value="Europe"
              />
              <RadioButton.Item
                label={t('race.regions.america')}
                value="America"
              />
              <RadioButton.Item
                label={t('race.regions.oceania')}
                value="Oceania"
              />
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

export default RegionPicker;
