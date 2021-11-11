import React from 'react';
import {useRaceSelector} from '../../store/hooks';
import {
  fetchServers,
  loadingServersSelector,
  selectedServerSelector,
} from '../../store/slices/Server';
import {useRoute} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ServerTabStackList} from '../../models/navigation/Navigation';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import DriverCard from '../shared/DriverCard';
import useDrivers from '../../hooks/useDrivers';
import {Rating} from '../../models/data/Ranked';
import {useDispatch, useSelector} from 'react-redux';

type RouteProps = NativeStackScreenProps<ServerTabStackList, 'Drivers'>;

const DriverDetails: React.FC = () => {
  const {params} = useRoute<RouteProps['route']>();
  const {Server: server} = useRaceSelector(selectedServerSelector(params.id));
  const {drivers} = useDrivers(server.Players);
  const loading = useSelector(loadingServersSelector);
  const dispatch = useDispatch();

  const updateServer = async () => await dispatch(fetchServers());

  const renderItem: ListRenderItem<Rating> = ({item}) => (
    <DriverCard driver={item} />
  );

  return (
    <SafeAreaView>
      <FlatList
        refreshing={loading}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={updateServer} />
        }
        data={drivers}
        renderItem={renderItem}
        keyExtractor={item => `driver-${item.UserId}`}
      />
    </SafeAreaView>
  );
};

export default DriverDetails;
