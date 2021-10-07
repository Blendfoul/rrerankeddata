import React, {useEffect} from 'react';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {UserTabStackList} from '../../models/navigation/Navigation';
import {useRoute} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRaces, userRacesSelector} from '../../store/slices/User';
import {FlatList, ListRenderItem} from 'react-native';
import RaceResult from './RaceResult';
import LoadingComponent from './LoadingComponent';
import {Result} from '../../models/data/User';

type Props = MaterialTopTabScreenProps<UserTabStackList, 'Races'>;

const UserRaces: React.FC = () => {
  const {params} = useRoute<Props['route']>();
  const {races, isLoading} = useSelector(userRacesSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRaces(params.id));
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  const renderItem: ListRenderItem<Result> = ({item}) => (
    <RaceResult data={item} />
  );

  return (
    <FlatList
      data={races.Entries}
      renderItem={renderItem}
      keyExtractor={item => `${item.RaceHash}`}
    />
  );
};

export default UserRaces;
