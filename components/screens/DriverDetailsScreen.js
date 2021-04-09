import React, {useContext} from 'react';
import DriverComponent from '../driver/DriverComponent';
import {Snackbar} from 'react-native-paper';
import {useRaceStore} from '../../store/RaceContext';
import {Observer} from 'mobx-react-lite';
import {LocalizationContext} from '../translations/LocalizationContext';

const DriverDetailsScreen = ({route, navigation}) => {
  const raceStore = useRaceStore();
  const {translations} = useContext(LocalizationContext);

  const onDismissSnackBar = () => raceStore.setNotification(false);
  return (
    <>
      <DriverComponent navigation={navigation} username={route.params} />
      <Observer>
        {() => (
          <Snackbar
            visible={raceStore.notifyDefaultDriver}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Ok',
              onPress: onDismissSnackBar,
            }}>
            {translations.messages.driverSet}
          </Snackbar>
        )}
      </Observer>
    </>
  );
};

export default DriverDetailsScreen;
