import React, {useContext} from 'react';
import {useRaceContext} from '../../store/RaceContext';
import {LocalizationContext} from '../translations/LocalizationContext';
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from '../utils/Theme';
import TextContainer from '../utils/TextContainer';
import {ServerInterface} from '../../types/server';
import {ReducerActions} from '../../store/StoreReducer';
import useDrawerContent from '../../hooks/useDrawerContent';
import {useTheme} from 'react-native-paper';
import ServerCover from './ServerCover';
import ServerConfig from './ServerConfig';
import ServerRaceConfig from './ServerRaceConfig';

interface DetailsProps {
  data: string;
}

const ServerDetailsData: React.FC<DetailsProps> = ({data}) => {
  const [state, dispatch] = useRaceContext();
  const {translations} = useContext(LocalizationContext);
  const {driver} = useDrawerContent();
  const {colors} = useTheme();

  const {Server}: ServerInterface = state.races.find(
    (server: ServerInterface) => server.Server.Settings.ServerName === data,
  );

  const handleRefresh = () => {
    dispatch({
      type: ReducerActions.REFRESH_SERVERS,
      payload: !state.refresh,
    });
  };

  const color =
    (driver && driver.reputation < Server.Settings.MinReputation) ||
    (driver && driver.rating < Server.Settings.MinRating)
      ? {backgroundColor: colors.error}
      : {backgroundColor: colors.primary};

  return (
    <ScrollView
      style={[styles.column, styles.backgroundColorTarget]}
      refreshControl={
        <RefreshControl refreshing={state.refresh} onRefresh={handleRefresh} />
      }>
      <ServerCover item={Server} />
      {driver &&
        (driver.reputation < Server.Settings.MinReputation ||
        driver!.rating < Server.Settings.MinRating ? (
          <View style={[styles.root, styles.column, color]}>
            <TextContainer title={translations.raceDetails.lowReputation} />
          </View>
        ) : null)}
      <ServerConfig item={Server} />
      <ServerRaceConfig item={Server} />
    </ScrollView>
  );
};

export default ServerDetailsData;
