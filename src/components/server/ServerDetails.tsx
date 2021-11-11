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
import {RefreshControl, ScrollView} from 'react-native';
import Server from './Server';
import ServerInformation from './details/ServerInformation';
import ServerSettings from './details/ServerSettings';
import ServerPermission from './details/ServerPermission';
import {useDispatch, useSelector} from 'react-redux';

type RouteProps = NativeStackScreenProps<ServerTabStackList, 'Info'>;

const ServerDetails: React.FC = () => {
  const {params} = useRoute<RouteProps['route']>();
  const dispatch = useDispatch();
  const server = useRaceSelector(selectedServerSelector(params.id));
  const loading = useSelector(loadingServersSelector);

  const updateServer = async () => await dispatch(fetchServers());

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={updateServer} />
      }>
      <ServerPermission
        minRating={server.Server.Settings.MinRating}
        minReputation={server.Server.Settings.MinReputation}
      />
      <Server data={server} />
      <ServerInformation data={server} />
      <ServerSettings data={server} />
    </ScrollView>
  );
};

export default ServerDetails;
