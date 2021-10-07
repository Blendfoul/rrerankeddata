import React from 'react';
import {useRaceSelector} from '../../store/hooks';
import {selectedServerSelector} from '../../store/slices/Server';
import {useRoute} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ServerTabStackList} from '../../models/navigation/Navigation';
import {FlatList, ListRenderItem, SafeAreaView} from 'react-native';
import DriverCard from '../shared/DriverCard';
import useDrivers from '../../hooks/useDrivers';
import {Rating} from '../../models/data/Ranked';

type RouteProps = NativeStackScreenProps<ServerTabStackList, 'Drivers'>;

const DriverDetails: React.FC = () => {
  const {params} = useRoute<RouteProps['route']>();
  const {Server: server} = useRaceSelector(selectedServerSelector(params.id));
  const {drivers} = useDrivers(server.Players);

  const renderItem: ListRenderItem<Rating> = ({item}) => (
    <DriverCard driver={item} />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={drivers}
        renderItem={renderItem}
        keyExtractor={item => `driver-${item.UserId}`}
      />
    </SafeAreaView>
  );
};

export default DriverDetails;
