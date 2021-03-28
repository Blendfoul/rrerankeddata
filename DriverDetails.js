import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {Profile} from './interfaces/Profile';
import {useRaceStore} from './store/RaceContext';
import type {Driver} from './interfaces/Driver';
import Developer from './assets/developer.svg';
import Vip from './assets/vip.svg';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TextContainer from './TextContainer';
import {styles} from './Theme';

function PinContainer(props: {data: any}) {
  return (
    <View style={componentStyle.logoContainer}>
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
      <View style={styles.row}>
        <TextContainer
          title={'Name'}
          icon={<AntIcon name={'user'} color={'#fff'} size={15} />}
          text={data?.name}
          align={'flex-start'}
          titleAlign={'left'}
          textAlign={'left'}
        />
        <PinContainer data={data} />
      </View>
      <View style={styles.row}>
        <TextContainer
          title={'Team'}
          text={data?.team || 'Privateer'}
          align={'flex-start'}
          titleAlign={'left'}
          textAlign={'left'}
        />
        <View style={componentStyle.logoContainer} />
      </View>
      <View style={styles.row}>
        <TextContainer title={'Races'} text={driver?.RacesCompleted || 0} />
        <TextContainer
          title={'Rating'}
          icon={<AntIcon name={'solution1'} color={'#fff'} />}
          text={driver?.Rating || 1700}
        />
        <TextContainer
          title={'Reputation'}
          icon={<AntIcon name={'exception1'} color={'#fff'} />}
          text={driver?.Reputation || 70}
        />
      </View>
    </>
  );
};

const componentStyle = StyleSheet.create({
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DriverDetails;
