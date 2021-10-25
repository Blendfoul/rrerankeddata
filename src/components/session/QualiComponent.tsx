import React from 'react';
import {useSelector} from 'react-redux';
import {FlatList, ListRenderItem} from 'react-native';
import {QualiResult} from '../../models/data/Result';
import {qualiSelector} from '../../store/slices/Session';
import QualiResultComponent from './quali/QualiResultComponent';

const QualiComponent: React.FC = () => {
  const data = useSelector(qualiSelector);

  const renderItem: ListRenderItem<QualiResult> = ({item}) => (
    <QualiResultComponent data={item} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => `quali-${item.UserId}`}
    />
  );
};

export default QualiComponent;
