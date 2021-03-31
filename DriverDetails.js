import React from 'react';
import {StyleSheet, View} from 'react-native';
import Developer from './assets/developer.svg';
import Vip from './assets/vip.svg';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TextContainer from './TextContainer';
import {styles} from './Theme';

function PinContainer({data}) {
  return (
    <View style={componentStyle.logoContainer}>
      {data?.simbiner ? <Developer /> : null}
      {data?.vip ? <Vip /> : null}
    </View>
  );
}

const DriverDetails = ({data, raceData}) => {
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
        <TextContainer title={'Races'} text={raceData?.RacesCompleted || 0} />
        <TextContainer
          title={'Rating'}
          icon={<AntIcon name={'solution1'} color={'#fff'} />}
          text={raceData?.Rating || 1700}
        />
        <TextContainer
          title={'Reputation'}
          icon={<AntIcon name={'exception1'} color={'#fff'} />}
          text={raceData?.Reputation || 70}
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
