import React, {useContext} from 'react';
import DriverComponent from '../driver/DriverComponent';
import {Snackbar} from 'react-native-paper';
import {useRaceContext} from '../../store/RaceContext';
import {LocalizationContext} from '../translations/LocalizationContext';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ReducerActions} from '../../store/StoreReducer';

interface DriverDetailsScreenProps {
  navigation: DrawerNavigationProp<any>;
  route: {
    params: {
      data: string;
    };
  };
}

const DriverDetailsScreen: React.FC<DriverDetailsScreenProps> = ({route}) => {
  const [state, dispatch] = useRaceContext();
  const {translations} = useContext(LocalizationContext);

  const onDismissSnackBar = () =>
    dispatch({type: ReducerActions.SET_NOTIFICATION, payload: false});
  return (
    <>
      <DriverComponent username={route.params.data} />
      <Snackbar
        visible={state.notifyDefaultDriver || false}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: onDismissSnackBar,
        }}>
        {translations.messages.driverSet}
      </Snackbar>
    </>
  );
};

export default DriverDetailsScreen;
