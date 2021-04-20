import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from '../utils/Theme';
import CarClass from '../utils/CarClass';
import TextContainer from '../utils/TextContainer';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import CountDown from 'react-native-countdown-component';
import {layouts} from '../../assets/r3e-data.json';
import {LocalizationContext} from '../translations/LocalizationContext';
import {useRaceStore} from '../../store/RaceContext';
import axios from 'axios';

const padding = {paddingTop: 15};

const RaceDetailsData = ({data, details}) => {
  const {translations} = useContext(LocalizationContext);
  const [session, setSession] = useState('');
  const [refresh, setRefresh] = useState(false);
  const raceStore = useRaceStore();

  const refreshControl = useCallback(async () => {
    const source = axios.CancelToken.source();

    try {
      setRefresh(true);

      const response = await axios('multiplayer-rating/servers/', {
        token: source.token,
      });

      raceStore.setRaces(response.data.result);

      setRefresh(false);
    } catch (e) {
      console.error(e);
    }

    return () => source.cancel();
  }, [raceStore, refresh]);

  useEffect(() => {
    switch (data.CurrentSession) {
      case 0:
        setSession(translations.session.practice);
        break;
      case 256:
        setSession(translations.session.qualification);
        break;
      case 768:
        setSession(translations.session.race);
        break;
    }
  }, [
    data.CurrentSession,
    translations.session.practice,
    translations.session.qualification,
    translations.session.race,
  ]);

  return (
    <ScrollView
      style={[styles.column, styles.backgroundColor]}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={refreshControl} />
      }>
      <View style={[styles.row, styles.alignCenter, padding]}>
        <CarClass
          liveries={data.Settings.LiveryId}
          size={45}
          imgSize={'small'}
        />
      </View>
      <View style={[styles.row, padding]}>
        <TextContainer
          title={translations.raceDetails.layout}
          text={layouts[data.Settings.TrackLayoutId].Name}
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
              until={data.TimeLeft / 1000}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{m: null, s: null}}
              size={15}
              onFinish={refreshControl}
            />
          }
        />
      </View>
      <View style={[styles.row, padding]}>
        <TextContainer
          title={'P'}
          text={data.Settings.PracticeDuration + ' min'}
        />
        <TextContainer
          title={'Q'}
          text={data.Settings.QualifyDuration + ' min'}
        />
        <TextContainer
          title={'R'}
          text={data.Settings.Race1Duration + ' min'}
        />
      </View>
      <View style={[styles.row, padding]}>
        <TextContainer
          title={translations.raceDetails.tireWear}
          text={data.Settings.TireWear + 'x'}
        />
        <TextContainer
          title={translations.raceDetails.fuel}
          text={data.Settings.FuelUsage + 'x'}
        />
      </View>
      <View style={[styles.row, padding]}>
        <TextContainer
          title={translations.raceDetails.mandatoryPit}
          text={
            data.Settings.MandatoryPitStop
              ? translations.raceDetails.enabled
              : translations.raceDetails.disabled
          }
        />
        <TextContainer
          title={translations.raceDetails.cutRules}
          text={'Slow Down'}
        />
      </View>
      <View style={[styles.row, padding, {paddingBottom: 25}]}>
        <TextContainer
          title={translations.raceDetails.players}
          text={data.PlayersOnServer}
        />
        <TextContainer
          title={translations.raceDetails.sof}
          text={details.sof.toFixed(3)}
        />
        <TextContainer
          title={translations.raceDetails.reputation}
          text={details.rep.toFixed(3)}
        />
      </View>
    </ScrollView>
  );
};

export default RaceDetailsData;
