import React from 'react';
import {useSelector} from 'react-redux';
import {raceSelector} from '../../store/slices/Session';
import {FlatList, ListRenderItem} from 'react-native';
import {RaceResult} from '../../models/data/Result';
import RaceResultComponent from './race/RaceResultComponent';

const RaceComponent: React.FC = () => {
  const data = useSelector(raceSelector);

  const renderItem: ListRenderItem<RaceResult> = ({item}) => (
    <RaceResultComponent data={item} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => `race-${item.UserId}`}
    />
  );
};

export default RaceComponent;
