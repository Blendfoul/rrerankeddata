import React, {useCallback, useContext, useEffect} from 'react';
import {useRaceStore} from '../../store/RaceContext';
import DriverComponent from '../driver/DriverComponent';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {styles} from '../utils/Theme';
import {useIsFocused} from '@react-navigation/core';
import {LocalizationContext} from '../translations/LocalizationContext';

const DefaultUser = ({route, navigation}) => {
  const raceStore = useRaceStore();
  const hasDefault = raceStore.DefaultDriver.length > 0;
  const focused = useIsFocused();
  const {translations} = useContext(LocalizationContext);

  useEffect(() => {}, [focused, raceStore.DefaultDriver]);

  const redirectSearch = useCallback(
    () => navigation.navigate(translations.user.search),
    [navigation, translations.user.search],
  );

  return hasDefault ? (
    <DriverComponent
      username={raceStore.DefaultDriver}
      navigation={navigation}
    />
  ) : (
    <View
      style={[
        styles.column,
        styles.alignCenter,
        styles.justifyCenter,
        styles.backgroundColor,
      ]}>
      <Text style={styles.title}>{translations.user.bummer}</Text>
      <Text style={[styles.text, styles.paddingVertical5]}>
        {translations.user.message}
      </Text>
      <Button
        buttonStyle={componentStyle.setButton}
        onPress={redirectSearch}
        title={translations.user.search}
        iconRight
        icon={<AntIcon name={'user'} size={25} color={'#fff'} />}
      />
    </View>
  );
};

const componentStyle = StyleSheet.create({
  setButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: 150,
    height: 50,
  },
});

export default DefaultUser;
