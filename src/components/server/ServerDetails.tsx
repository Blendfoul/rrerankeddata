import React from 'react';

import { useRoute } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RefreshControl, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ServerInformation from './details/ServerInformation';
import ServerPermission from './details/ServerPermission';
import ServerSettings from './details/ServerSettings';
import Server from './Server';
import { ServerTabStackList } from '../../models/navigation/Navigation';
import { useRaceSelector } from '../../store/hooks';
import {
  fetchServers,
  loadingServersSelector,
  selectedServerSelector,
} from '../../store/slices/Server';

type RouteProps = NativeStackScreenProps<ServerTabStackList, 'Info'>;

const ServerDetails: React.FC = () => {
  const { params } = useRoute<RouteProps['route']>();
  const dispatch = useDispatch();
  const server = useRaceSelector(selectedServerSelector(params.id));
  const loading = useSelector(loadingServersSelector);

  const updateServer = async () => await dispatch(fetchServers());

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={updateServer} />}>
      <ServerPermission
        minRating={server.Server.Settings.MinRating}
        minReputation={server.Server.Settings.MinReputation}
      />
      <Server data={server} option />
      <ServerInformation data={server} />
      <ServerSettings data={server} />
    </ScrollView>
  );
};

export default ServerDetails;
