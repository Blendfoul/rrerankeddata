import React from 'react';
import {useRoute} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UserStackList} from '../models/navigation/Navigation';
import Details from '../components/sessionDetails/Details';
import LapTable from '../components/sessionDetails/LapTable';
import {ScrollView} from 'react-native';

type Props = NativeStackScreenProps<UserStackList, 'Details'>['route'];

const SessionDetailsScreen: React.FC = () => {
  const {
    params: {data},
  } = useRoute<Props>();

  return (
    <ScrollView>
      <Details data={data} />
      <LapTable data={data.Laps} />
    </ScrollView>
  );
};

export default SessionDetailsScreen;
