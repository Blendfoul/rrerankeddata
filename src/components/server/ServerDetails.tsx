import React from 'react';
import {useRaceSelector} from '../../store/hooks';
import {selectedServerSelector} from '../../store/slices/Server';
import {useRoute} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ServerTabStackList} from '../../models/navigation/Navigation';
import {SafeAreaView, ScrollView} from 'react-native';
import Server from './Server';
import ServerInformation from './details/ServerInformation';
import ServerSettings from './details/ServerSettings';
import ServerPermission from './details/ServerPermission';

type RouteProps = NativeStackScreenProps<ServerTabStackList, 'Info'>;

const ServerDetails: React.FC = () => {
  const {params} = useRoute<RouteProps['route']>();
  const server = useRaceSelector(selectedServerSelector(params.id));

  return (
    <SafeAreaView>
      <ScrollView>
        <ServerPermission
          minRating={server.Server.Settings.MinRating}
          minReputation={server.Server.Settings.MinReputation}
        />
        <Server data={server} />
        <ServerInformation data={server} />
        <ServerSettings data={server} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServerDetails;
