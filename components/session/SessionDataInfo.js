import React from 'react';
import type {RaceInfo} from '../../interfaces/RaceData';
import {View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TextContainer from '../utils/TextContainer';
import {styles} from '../utils/Theme';
import {session} from '../../assets/strings/en.json';

const SessionDataInfo = (props: {info: RaceInfo}) => {
  const data: RaceInfo = props.info;
  return (
    <View style={[styles.column, styles.backgroundColor]}>
      <DriversOverall data={data} layoutId={props.layoutId} />
      <DataAverage data={data} />
      <DataOverall data={data} />
      <LaptimeData data={data} />
    </View>
  );
};

function DriversOverall({data, layoutId}: {data: RaceInfo, layoutId: String}) {
  return (
    <>
      <View style={styles.row}>
        <TextContainer title={session.layout} text={layoutId} />
      </View>
      <View style={styles.row}>
        <TextContainer
          title={session.drivers}
          icon={<AntIcon name={'team'} color={'#fff'} size={15} />}
          text={data.Drivers}
        />
        <TextContainer
          title={session.positions}
          text={data.PositionsGainedOverall}
        />
      </View>
    </>
  );
}

function DataOverall(props: {data: any}) {
  return (
    <View style={styles.row}>
      <TextContainer
        title={session.overall}
        icon={
          <AntIcon
            name={'solution1'}
            color={props.data.RatingOverall >= 0 ? '#24B533' : '#BB2124'}
            size={15}
          />
        }
        text={props.data.RatingOverall}
      />
      <TextContainer
        title={session.overall}
        icon={<AntIcon name={'close'} color={'#fff'} size={15} />}
        text={props.data.IncidentsOverall}
      />
      <TextContainer
        title={session.overall}
        icon={
          <AntIcon
            name={'exception1'}
            color={props.data.ReputationOverall >= 0 ? '#24B533' : '#BB2124'}
            size={15}
          />
        }
        text={props.data.ReputationOverall}
      />
    </View>
  );
}

function DataAverage(props) {
  return (
    <View style={styles.row}>
      <TextContainer
        title={session.average}
        icon={
          <AntIcon
            name={'solution1'}
            color={props.data.RatingAverage >= 0 ? '#24B533' : '#BB2124'}
            size={15}
          />
        }
        text={props.data.RatingAverage}
      />
      <TextContainer
        title={session.average}
        icon={<AntIcon name={'close'} color={'#fff'} size={15} />}
        text={props.data.IncidentsAverage}
      />
      <TextContainer
        title={session.average}
        icon={
          <AntIcon
            name={'exception1'}
            color={props.data.ReputationAverage >= 0 ? '#24B533' : '#BB2124'}
            size={15}
          />
        }
        text={props.data.ReputationAverage}
      />
    </View>
  );
}

function LaptimeData(props) {
  return (
    <View style={styles.row}>
      <TextContainer
        title={session.fastest}
        text={props.data.BestLaptimeOverallText}
        titleSize={14}
      />
      <TextContainer
        title={session.averageLap}
        text={props.data.AvgLaptimeOverallText}
        titleSize={14}
      />
      <TextContainer
        title={session.diffTimer}
        text={props.data.MaxDiffFastestLapText}
        titleSize={14}
      />
    </View>
  );
}

export default SessionDataInfo;
