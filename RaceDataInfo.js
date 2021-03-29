import React from 'react';
import type {RaceInfo} from './interfaces/RaceData';
import {View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TextContainer from './TextContainer';
import {styles} from './Theme';

const RaceDataInfo = (props: {info: RaceInfo}) => {
  const data: RaceInfo = props.info;

  return (
    <View style={[styles.column]}>
      <DataAverage data={data} />
      <DataOverall data={data} />
      <LaptimeData data={data} />
    </View>
  );
};

function DataOverall(props: {data: any}) {
  return (
    <View style={styles.row}>
      <TextContainer
        title={'overall'}
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
        title={'overall'}
        icon={<AntIcon name={'exception1'} color={'#fff'} size={15} />}
        text={props.data.IncidentsOverall}
      />
      <TextContainer
        title={'overall'}
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
        title={'average'}
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
        title={'average'}
        icon={<AntIcon name={'exception1'} color={'#fff'} size={15} />}
        text={props.data.IncidentsAverage}
      />
      <TextContainer
        title={'average'}
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
        title={'Fastest Lap'}
        text={props.data.BestLaptimeOverallText}
        titleSize={14}
      />
      <TextContainer
        title={'Avg. Laptime'}
        text={props.data.AvgLaptimeOverallText}
        titleSize={14}
      />
      <TextContainer
        title={'Diff. average'}
        text={props.data.MaxDiffFastestLapText}
        titleSize={14}
      />
    </View>
  );
}

export default RaceDataInfo;
