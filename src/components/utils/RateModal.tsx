import React, {useCallback, useContext, useEffect} from 'react';
import {Button, Caption, Modal, Text, Title, useTheme} from 'react-native-paper';
import {useRaceContext} from '../../store/RaceContext';
import {LocalizationContext} from '../translations/LocalizationContext';
import {ReducerActions} from '../../store/StoreReducer';
import {Linking, StyleSheet, View} from 'react-native';

const RateModalComponent: React.FC = () => {
  const {colors} = useTheme();
  const {translations} = useContext(LocalizationContext);
  const [state, dispatch] = useRaceContext();

  useEffect(() => {
    if (state.rateModal.nOpens === 5 && !state.rateModal.isRated) {
      dispatch({
        type: ReducerActions.SET_RATE_ACTION,
        payload: {
          ...state.rateModal,
          isVisible: true,
          nOpens: 0,
        },
      });
    }
    console.log(state.rateModal.nOpens);
  }, [dispatch, state.rateModal, state.rateModal.nOpens]);

  const style = StyleSheet.create({
    root: {
      flex: 1,
      height: 350,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      margin: 30,
      backgroundColor: colors.background,
    },
    button: {
      width: '100%',
      margin: 7.5,
      backgroundColor: colors.accent,
      color: colors.text,
    },
    textContainer: {
      flex: 0.5,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const handleYoureAwesome = useCallback(() => {
    Linking.openURL('market://details?id=com.rrerankeddata').then(() => {
      dispatch({
        type: ReducerActions.SET_RATE_ACTION,
        payload: {
          isRated: true,
          isVisible: false,
          nOpens: 0,
        },
      });
    });
  }, [dispatch]);

  const handleRememberLater = useCallback(() => {
    dispatch({
      type: ReducerActions.SET_RATE_ACTION,
      payload: {
        ...state.rateModal,
        isVisible: false,
        isRated: false,
        nOpens: 2,
      },
    });
  }, [dispatch, state.rateModal]);

  const handleYouSuck = useCallback(() => {
    dispatch({
      type: ReducerActions.SET_RATE_ACTION,
      payload: {
        isRated: true,
        isVisible: false,
        nOpens: 0,
      },
    });
  }, [dispatch]);

  return (
    <Modal
      visible={state.rateModal.isVisible}
      style={style.root}
      onDismiss={handleRememberLater}>
      <View style={style.textContainer}>
        <Title>{translations.rateModal.title}</Title>
        <Caption>{translations.rateModal.paragraph}</Caption>
      </View>
      <View style={style.buttonContainer}>
        <Button style={style.button} onPress={handleYoureAwesome}>
          <Text>{translations.rateModal.rate}</Text>
        </Button>
        <Button style={style.button} onPress={handleRememberLater}>
          <Text>{translations.rateModal.later}</Text>
        </Button>
        <Button style={style.button} onPress={handleYouSuck}>
          <Text>{translations.rateModal.never}</Text>
        </Button>
      </View>
    </Modal>
  );
};

export default RateModalComponent;
