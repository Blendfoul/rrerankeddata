import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import type {Server} from './interfaces/Server';
import CarClass from './CarClass';
import RankedDetails from './RankedDetails';
import CountDown from 'react-native-countdown-component';
import {layouts} from './assets/r3e-data.json';
import TextContainer from './TextContainer';
import {styles} from './Theme';

const SessionDetails = props => {
  const [session, setSession] = useState('');
  const sessionData: Server.Server = props.session;

  useEffect(() => {
    switch (sessionData.CurrentSession) {
      case 0:
        setSession('Pratice');
        break;
      case 256:
        setSession('Qualify');
        break;
      case 768:
        setSession('Race');
        break;
      default:
        setSession('Unknown');
        break;
    }
  }, [sessionData.CurrentSession]);

  return (
    <>
      <View
        style={[
          styles.row,
          styles.alignStart,
          styles.justifyAround,
          styles.paddingTop15,
        ]}>
        <CarClass
          liveries={sessionData.Settings.LiveryId}
          size={45}
          imgSize={'small'}
        />
      </View>
      <View
        style={[
          styles.row,
          styles.alignStart,
          styles.justifyAround,
          styles.paddingTop15,
        ]}>
        <TextContainer title={'Session'} text={session} />
        <TextContainer
          title={'Time Left'}
          text={
            <CountDown
              until={sessionData.TimeLeft / 1000}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{m: null, s: null}}
              size={15}
            />
          }
        />
      </View>
      <View
        style={[
          styles.row,
          styles.alignStart,
          styles.justifyAround,
          styles.paddingTop15,
        ]}>
        <TextContainer
          title={'Track Layout'}
          text={layouts[sessionData.Settings.TrackLayoutId].Name}
        />
      </View>
      <View
        style={[
          styles.row,
          styles.alignStart,
          styles.justifyAround,
          styles.paddingTop15,
        ]}>
        <TextContainer
          title={'P'}
          text={sessionData.Settings.PracticeDuration + ' min'}
        />
        <TextContainer
          title={'Q'}
          text={sessionData.Settings.QualifyDuration + ' min'}
        />
        <TextContainer
          title={'R'}
          text={sessionData.Settings.Race1Duration + ' min'}
        />
      </View>
      <View
        style={[
          styles.row,
          styles.alignStart,
          styles.justifyAround,
          styles.paddingTop15,
        ]}>
        <TextContainer
          title={'Tire Wear'}
          text={sessionData.Settings.TireWear + 'x'}
        />
        <TextContainer
          title={'Fuel Usage'}
          text={sessionData.Settings.FuelUsage + 'x'}
        />
      </View>
      <RankedDetails
        data={sessionData}
        navigation={props.navigation}
        loading={props.loading}
      />
    </>
  );
};

export default SessionDetails;
