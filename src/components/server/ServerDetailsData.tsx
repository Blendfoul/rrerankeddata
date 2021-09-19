import React, {useContext} from 'react';
import {useRaceContext} from '../../store/RaceContext';
import {LocalizationContext} from '../translations/LocalizationContext';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {styles} from '../utils/Theme';
import TextContainer from '../utils/TextContainer';
import {ServerData, ServerInterface} from '../../types/server';
import {ReducerActions} from '../../store/StoreReducer';
import useDrawerContent, {User} from '../../hooks/useDrawerContent';
import {Card, useTheme} from 'react-native-paper';
import ServerCover from './ServerCover';
import ServerConfig from './ServerConfig';
import ServerRaceConfig from './ServerRaceConfig';
import {useRoute} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ServerTabsStackList} from '../../types/NavigatorProps';

type PermissionProps = {
  driver: User | null;
  server: ServerData;
};

const ServerPermission: React.FC<PermissionProps> = ({driver, server}) => {
  const {colors} = useTheme();
  const {translations} = useContext(LocalizationContext);

  const componentStyles = StyleSheet.create({
    color:
      (driver && driver.reputation < server.Settings.MinReputation) ||
      (driver && driver.rating < server.Settings.MinRating)
        ? {backgroundColor: colors.error}
        : {backgroundColor: colors.primary},
    root: {
      margin: 5,
    },
  });

  if (
    driver!.reputation < server.Settings.MinReputation ||
    driver!.rating < server.Settings.MinRating
  ) {
    return (
      <Card style={[componentStyles.root, componentStyles.color]}>
        <Card.Content>
          <TextContainer title={translations.raceDetails.lowReputation} />
        </Card.Content>
      </Card>
    );
  }

  return null;
};

type Props = NativeStackNavigationProp<ServerTabsStackList, 'data'>;

const ServerDetailsData: React.FC = () => {
  // @ts-ignore
  const {params} = useRoute<Props['route']>();
  const [state, dispatch] = useRaceContext();
  const {driver} = useDrawerContent();

  const {Server}: ServerInterface = state.races.find(
    (server: ServerInterface) =>
      server.Server.Settings.ServerName === params.serverName,
  );

  const handleRefresh = () => {
    dispatch({
      type: ReducerActions.REFRESH_SERVERS,
      payload: !state.refresh,
    });
  };

  return (
    <ScrollView
      style={styles.column}
      refreshControl={
        <RefreshControl refreshing={state.refresh} onRefresh={handleRefresh} />
      }>
      <ServerCover item={Server} />
      {driver && <ServerPermission server={Server} driver={driver} />}
      <ServerConfig item={Server} />
      <ServerRaceConfig item={Server} />
    </ScrollView>
  );
};

export default ServerDetailsData;
