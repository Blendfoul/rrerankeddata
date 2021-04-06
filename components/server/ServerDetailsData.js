import {ScrollView, View} from 'react-native';
import {styles} from '../utils/Theme';
import CarClass from '../utils/CarClass';
import TextContainer from '../utils/TextContainer';
import React, {useContext} from 'react';
import CountDown from 'react-native-countdown-component';
import {layouts} from '../../assets/r3e-data.json';
import {LocalizationContext} from '../translations/LocalizationContext';

const padding = {paddingTop: 15};

const RaceDetailsData = ({data, details, session}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <ScrollView style={[styles.column, styles.backgroundColor]}>
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
          text={data.Settings.MandatoryPitStop ? 'Enabled' : 'Disabled'}
        />
        <TextContainer
          title={translations.raceDetails.cutRules}
          text={'Slow Down'}
        />
      </View>
      <View style={[styles.row, padding]}>
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
