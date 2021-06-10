import React, {useContext} from 'react';
import {useRaceContext} from '../../store/RaceContext';
import {LocalizationContext} from '../translations/LocalizationContext';
import LoadingActivity from '../utils/LoadingActivity';
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from '../utils/Theme';
import useRaceSession from '../../hooks/useRaceSession';
import TextContainer from '../utils/TextContainer';
import TrackImage from '../utils/TrackImage';
import CarClass from '../utils/CarClass';
import {ServerInterface} from '../../types/server';
//@ts-ignore
import CountDown from 'react-native-countdown-component';
import useServerSof from '../../hooks/useServerSof';
import {ReducerActions} from '../../store/StoreReducer';
import useDrawerContent from '../../hooks/useDrawerContent';
import {useTheme} from 'react-native-paper';

interface DetailsProps {
  data: string;
}

const padding = {paddingTop: 15};

const ServerDetailsData: React.FC<DetailsProps> = ({data}) => {
  const [state, dispatch] = useRaceContext();
  const {translations} = useContext(LocalizationContext);
  const {layouts} = state.r3e_data;
  const {driver} = useDrawerContent();
  const {colors} = useTheme();

  const {Server}: ServerInterface = state.races.find(
    (server: ServerInterface) => server.Server.Settings.ServerName === data,
  );

  const {session} = useRaceSession(Server.CurrentSession);
  const {sof, rep, loading} = useServerSof(Server.Players);

  if (loading) {
    return <LoadingActivity title={translations.loading.details} />;
  }

  const handleTimeFinish = () => {
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
        <RefreshControl
          refreshing={state.refresh}
          onRefresh={handleTimeFinish}
        />
      }>
      <View style={[styles.root, {padding: 0, overflow: 'hidden'}]}>
        <TrackImage trackId={Server.Settings.TrackLayoutId[0]} />
      </View>
      <View style={[styles.root, padding]}>
        <CarClass
          liveries={Server.Settings.LiveryId}
          size={45}
          imgSize={'small'}
        />
      </View>
      {driver &&
        (driver.reputation < Server.Settings.MinReputation ||
        driver!.rating < Server.Settings.MinRating ? (
          <View style={[styles.root, styles.column, color]}>
            <TextContainer title={translations.raceDetails.lowReputation} />
          </View>
        ) : null)}
      <View style={[styles.root, styles.column]}>
        <View style={[styles.row, padding, {paddingBottom: 25}]}>
          <TextContainer
            title={translations.raceDetails.players}
            text={Server.PlayersOnServer}
          />
          <TextContainer
            title={translations.raceDetails.sof}
            text={sof.toFixed(3)}
          />
          <TextContainer
            title={translations.raceDetails.reputation}
            text={rep.toFixed(3)}
          />
        </View>
      </View>
      <View style={[styles.root, styles.column]}>
        <View style={[styles.row, padding]}>
          <TextContainer
            title={translations.raceDetails.layout}
            //@ts-ignore
            text={layouts[Server.Settings.TrackLayoutId[0]].Name}
          />
        </View>
        <View style={[styles.row, padding]}>
          <TextContainer
            title={translations.raceDetails.session}
            text={session}
          />
          <TextContainer
            title={translations.raceDetails.time}
            text={
              <CountDown
                until={Server.TimeLeft / 1000}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{m: null, s: null}}
                size={15}
                onFinish={handleTimeFinish}
              />
            }
          />
        </View>
        <View style={[styles.row, padding]}>
          <TextContainer
            title={'P'}
            text={Server.Settings.PracticeDuration + ' min'}
          />
          <TextContainer
            title={'Q'}
            text={Server.Settings.QualifyDuration + ' min'}
          />
          <TextContainer
            title={'R'}
            text={Server.Settings.Race1Duration + ' min'}
          />
        </View>
      </View>
      <View style={[styles.root, styles.column]}>
        <View style={[styles.row, padding]}>
          <TextContainer
            title={translations.raceDetails.tireWear}
            text={Server.Settings.TireWear + 'x'}
          />
          <TextContainer
            title={translations.raceDetails.fuel}
            text={Server.Settings.FuelUsage + 'x'}
          />
        </View>
        <View style={[styles.row, padding]}>
          <TextContainer
            title={translations.raceDetails.mandatoryPit}
            text={
              Server.Settings.MandatoryPitStop
                ? translations.raceDetails.enabled
                : translations.raceDetails.disabled
            }
          />
          <TextContainer
            title={translations.raceDetails.cutRules}
            text={'Slow Down'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ServerDetailsData;
