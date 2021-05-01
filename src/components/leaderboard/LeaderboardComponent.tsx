import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {styles} from '../utils/Theme';
import LeaderboardSelector from './LeaderboardSelector';
import {FAB} from 'react-native-paper';
import {LocalizationContext} from '../translations/LocalizationContext';
import {NavigationProp} from '@react-navigation/core';

export interface Combo {
  trackId: number;
  classId: number;
}

export type ComboState = Combo | null;

const LeaderboardComponent: React.FC<{
  navigation: NavigationProp<any>;
}> = ({navigation}) => {
  const [selectedCombo, setCombo] = useState(null as ComboState);
  const [enabled, setEnabled] = useState(false);
  const {translations} = useContext(LocalizationContext);

  const checkCombo = useCallback(() => {
    if (selectedCombo === null) {
      setEnabled(false);
    } else if (
      selectedCombo.classId !== undefined &&
      selectedCombo.trackId !== undefined
    ) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [selectedCombo]);

  useEffect(() => {
    checkCombo();
  }, [checkCombo, selectedCombo]);

  return (
    <View style={[styles.column, styles.backgroundColor]}>
      <LeaderboardSelector data={[selectedCombo, setCombo!]} />
      {enabled ? (
        <FAB
          style={style.fab}
          icon="search-web"
          onPress={() =>
            navigation.navigate(translations.navigation.result, selectedCombo)
          }
        />
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#f3f3f3',
  },
});

export default LeaderboardComponent;
