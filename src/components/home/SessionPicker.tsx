import {
  Dialog,
  IconButton,
  Portal,
  RadioButton,
  useTheme,
} from 'react-native-paper';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {generalActions, sessionSelector} from '../../store/slices/General';

const SessionPicker: React.FC = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const session = useSelector(sessionSelector);

  return (
    <>
      <IconButton
        icon={'clock-outline'}
        color={colors.text}
        size={25}
        onPress={showDialog}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={value => {
                dispatch(generalActions.setSession(+value));
                hideDialog();
              }}
              value={session.toString()}>
              <RadioButton.Item label={t('session.all')} value={'-1'} />
              <RadioButton.Item label={t('session.practice')} value={'0'} />
              <RadioButton.Item
                label={t('session.qualification')}
                value="256"
              />
              <RadioButton.Item label={t('session.race')} value="768" />
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

export default SessionPicker;
