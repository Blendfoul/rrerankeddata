import React, { useEffect } from 'react';

import { useRoute } from '@react-navigation/core';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import RaceResult from './RaceResult';
import { Result } from '../../models/data/User';
import { UserTabStackList } from '../../models/navigation/Navigation';
import { defaultUserRacesSelector, fetchDefaultRaces } from '../../store/slices/DefaultUser';
import { fetchRaces, userRacesSelector } from '../../store/slices/User';
import LoadingComponent from '../shared/LoadingComponent';

type Props = MaterialTopTabScreenProps<UserTabStackList, 'Races'>;

type RaceProps = {};

const UserRaces: React.FC<RaceProps> = () => {
  const { params } = useRoute<Props['route']>();
  const { races, isLoading } = useSelector(
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

  const renderItem: ListRenderItem<Result> = ({ item }) => (
    <RaceResult data={item} type={params.type} />
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={() => dispatch(fetchRaces(params.id))} />
      }
      refreshing={isLoading}
      data={races.Entries}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.RaceHash}`}
    />
  );
};

export default UserRaces;
