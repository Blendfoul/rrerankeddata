import React from 'react';

import DriverComponent from './DriverComponent';
import {Snackbar} from 'react-native-paper';
import {useRaceStore} from './store/RaceContext';
import {Observer} from 'mobx-react-lite';

const DriverDetailsScreen = ({route, navigation}) => {
  const raceStore = useRaceStore();
  const onDismissSnackBar = () => raceStore.setNotification(false);
  return (
    <>
      <DriverComponent data={route.params} navigation={navigation} />
      <Observer>
        {() => (
          <Snackbar
            visible={raceStore.notifyDefaultDriver}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Ok',
              onPress: onDismissSnackBar,
            }}>
            Default driver set!
          </Snackbar>
        )}
      </Observer>
    </>
  );
};

export default DriverDetailsScreen;
