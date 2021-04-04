import {ScrollView, View} from 'react-native';
import {styles} from '../utils/Theme';
import CarClass from '../utils/CarClass';
import TextContainer from '../utils/TextContainer';
import React from 'react';
import CountDown from 'react-native-countdown-component';
import {layouts} from '../../assets/r3e-data.json';

const padding = {paddingTop: 15};

const RaceDetailsData = ({data, details, session}) => {
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
          title={'Track Layout'}
          text={layouts[data.Settings.TrackLayoutId].Name}
        />
      </View>
      <View style={[styles.row, padding]}>
        <TextContainer title={'Session'} text={session} />
        <TextContainer
          title={'Time Left'}
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
          title={'Tire Wear'}
          text={data.Settings.TireWear + 'x'}
        />
        <TextContainer
          title={'Fuel Usage'}
          text={data.Settings.FuelUsage + 'x'}
        />
      </View>
      <View style={[styles.row, padding]}>
        <TextContainer
          title={'Mandatory Pit'}
          text={data.Settings.MandatoryPitStop ? 'Enabled' : 'Disabled'}
        />
        <TextContainer title={'Cut Rules'} text={'Slow Down'} />
      </View>
      <View style={[styles.row, padding]}>
        <TextContainer title={'Players'} text={data.PlayersOnServer} />
        <TextContainer title={'S.o.F.'} text={details.sof.toFixed(3)} />
        <TextContainer title={'Reputation'} text={details.rep.toFixed(3)} />
      </View>
    </ScrollView>
  );
};

export default RaceDetailsData;
