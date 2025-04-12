import React from 'react';

import { useRoute } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';

import Details from '../components/sessionDetails/Details';
import LapTable from '../components/sessionDetails/LapTable';
import { UserStackList } from '../models/navigation/Navigation';

type Props = NativeStackScreenProps<UserStackList, 'Details'>['route'];

const SessionDetailsScreen: React.FC = () => {
  const {
    params: { data },
  } = useRoute<Props>();

  return (
    <ScrollView>
      <Details data={data} />
      <LapTable data={data.Laps} />
    </ScrollView>
  );
};

export default SessionDetailsScreen;
