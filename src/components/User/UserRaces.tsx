import React, {useEffect} from 'react';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {UserTabStackList} from '../../models/navigation/Navigation';
import {useRoute} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRaces, userRacesSelector} from '../../store/slices/User';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import RaceResult from './RaceResult';
import LoadingComponent from '../shared/LoadingComponent';
import {Result} from '../../models/data/User';
import {
  defaultUserRacesSelector,
  fetchDefaultRaces,
} from '../../store/slices/DefaultUser';

type Props = MaterialTopTabScreenProps<UserTabStackList, 'Races'>;

type RaceProps = {};

const UserRaces: React.FC<RaceProps> = () => {
  const {params} = useRoute<Props['route']>();
  const {races, isLoading} = useSelector(
    params.type === 'User' ? userRacesSelector : defaultUserRacesSelector,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    params.type === 'User'
      ? dispatch(fetchRaces(params.id))
      : dispatch(fetchDefaultRaces(params.id));
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  const renderItem: ListRenderItem<Result> = ({item}) => (
    <RaceResult data={item} type={params.type} />
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => dispatch(fetchRaces(params.id))}
        />
      }
      refreshing={isLoading}
      data={races.Entries}
      renderItem={renderItem}
      keyExtractor={item => `${item.RaceHash}`}
    />
  );
};

export default UserRaces;
