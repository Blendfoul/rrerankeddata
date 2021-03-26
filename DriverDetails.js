import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {Profile} from './interfaces/Profile';
import {useRaceStore} from './store/RaceContext';
import type {Driver} from './interfaces/Driver';
import Developer from './assets/developer.svg';
import Vip from './assets/vip.svg';
import AntIcon from 'react-native-vector-icons/AntDesign';

function PinContainer(props: {data: any}) {
  return (
    <View style={styles.logoContainer}>
      {props.data?.simbiner ? <Developer /> : null}
      {props.data?.vip ? <Vip /> : null}
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
          <Text style={styles.heading}>
            Name <AntIcon name={'user'} color={'#fff'} size={15} />
          </Text>
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
          <Text style={styles.text}>{driver?.RacesCompleted || 0}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>
            Rating <AntIcon name={'solution1'} color={'#fff'} size={15} />
          </Text>
          <Text style={styles.text}>{driver?.Rating || 1700}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>
            Reputation <AntIcon name={'exception1'} color={'#fff'} size={15} />
          </Text>
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
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
  },
});

export default DriverDetails;
