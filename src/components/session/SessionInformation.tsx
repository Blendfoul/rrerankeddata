import React from 'react';
import {useRoute} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SessionTabStackList} from '../../models/navigation/Navigation';
import {useSelector} from 'react-redux';
import {resultSelector} from '../../store/slices/User';
import {Card} from 'react-native-paper';
import CustomCardCover from '../shared/CustomCardCover';

type Props = NativeStackScreenProps<SessionTabStackList, 'Info'>['route'];

const SessionInformation: React.FC = () => {
  const {params} = useRoute<Props>();
  const data = useSelector(resultSelector(params.hash));

  return (
    <>
      <Card>
        <CustomCardCover
          source={{
            uri: '',
          }}
          resizeMode={'cover'}
        />
      </Card>
    </>
  );
};

export default SessionInformation;
