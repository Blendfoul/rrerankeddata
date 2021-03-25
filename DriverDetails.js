import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {Profile} from './Profile';
import {SvgUri} from 'react-native-svg';
import {useRaceStore} from './RaceContext';
import type {Driver} from './Driver';

function PinContainer(props: {data: any}) {
  return (
    <View style={styles.logoContainer}>
      {props.data?.simbiner ? (
        <SvgUri
          scaleX={0.25}
          scaleY={0.25}
          uri="https://prod.r3eassets.com/static/img/icons/developer_white.svg"
        />
      ) : null}
      {props.data?.isBroadcaster ? (
        <SvgUri
          scaleX={0.25}
          scaleY={0.25}
          style={styles.svg}
          uri="https://prod.r3eassets.com/static/img/icons/broadcaster_white.svg"
        />
      ) : null}
      {props.data?.vip ? (
        <SvgUri
          scaleX={0.15}
          scaleY={0.15}
          style={styles.svg}
          uri="https://prod.r3eassets.com/static/img/icons/vip_white.svg"
        />
      ) : null}
    </View>
  );
}

const DriverDetails = props => {
  const raceStore = useRaceStore();
  const data: Profile = props.data;

  const driver: Driver = raceStore.Ratings.find(
    (driver: Driver) => driver.UserId === data.user_id,
  );

  return (
    <>
      <View style={styles.data}>
        <View style={styles.container}>
          <Text style={styles.heading}>Name</Text>
          <Text style={styles.text}>{data?.name}</Text>
        </View>
        <PinContainer data={data} />
      </View>
      <View style={styles.data}>
        <View style={styles.container}>
          <Text style={styles.heading}>Team</Text>
          <Text style={styles.text}>{data?.team}</Text>
        </View>
      </View>
      <View style={styles.data}>
        <View style={styles.container}>
          <Text style={styles.heading}>Races</Text>
          <Text style={styles.text}>{driver?.RacesCompleted || 70}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Rating</Text>
          <Text style={styles.text}>{driver?.Rating || 1700}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Reputation</Text>
          <Text style={styles.text}>{driver?.Reputation || 70}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  data: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  heading: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
  },
});

export default DriverDetails;
