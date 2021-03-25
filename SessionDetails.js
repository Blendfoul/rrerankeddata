import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {Server} from './Server';
import CarClass from './CarClass';
import RankedDetails from './RankedDetails';
import CountDown from 'react-native-countdown-component';
import {layouts} from './assets/r3e-data.json';

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
      <View style={styles.container}>
        <CarClass
          liveries={sessionData.Settings.LiveryId}
          size={45}
          imgSize={'small'}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Session</Text>
        <Text style={styles.heading}>Time Left</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.session}>
          <Text style={styles.text}>{session}</Text>
        </View>
        <View style={styles.countdown}>
          <CountDown
            until={sessionData.TimeLeft / 1000}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{m: null, s: null}}
            size={15}
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Track Layout</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          {layouts[sessionData.Settings.TrackLayoutId].Name}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>P</Text>
        <Text style={styles.heading}>Q</Text>
        <Text style={styles.heading}>R</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          {sessionData.Settings.PracticeDuration} min
        </Text>
        <Text style={styles.text}>
          {sessionData.Settings.QualifyDuration} min
        </Text>
        <Text style={styles.text}>
          {sessionData.Settings.Race1Duration} min
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Tyre Wear</Text>
        <Text style={styles.heading}>Fuel Usage</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{sessionData.Settings.TireWear}x</Text>
        <Text style={styles.text}>{sessionData.Settings.FuelUsage}x</Text>
      </View>
      <RankedDetails data={sessionData} navigation={props.navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
  },
  countdown: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  session: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SessionDetails;
