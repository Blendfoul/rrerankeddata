import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import {LocalizationContext} from '../translations/LocalizationContext';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingsScreenParams} from '../../types/NavigatorProps';
import {FlatList} from 'react-native';
import {useRaceContext} from '../../store/RaceContext';

type Props = StackScreenProps<SettingsScreenParams, 'details'>;

const SettingsDetails: React.FC = () => {
  const {params} = useRoute<Props['route']>();
  const navigation = useNavigation();
  const {translations} = useContext(LocalizationContext);
  const [state, dispatch] = useRaceContext();

  useEffect(() => {
    navigation.setOptions({
      title: params.title,
    });
  }, [navigation, params.title]);

  return null;
};

export default SettingsDetails;
