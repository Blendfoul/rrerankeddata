import React from 'react';
import type {RaceInfo} from './interfaces/RaceData';
import {StyleSheet, Text, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

const RaceDataInfo = (props: {info: RaceInfo}) => {
  const data: RaceInfo = props.info;

  return (
    <View style={style.container}>
      <DataAverage data={data} />
      <DataOverall data={data} />
      <LaptimeData data={data} />
    </View>
  );
};

function DataOverall(props: {data: any}) {
  return (
    <View style={style.row}>
      <View style={style.textContainer}>
        <Text style={style.heading}>
          <AntIcon
            name={'solution1'}
            color={props.data.RatingOverall >= 0 ? '#24B533' : '#BB2124'}
            size={15}
          />{' '}
          overall
        </Text>
        <Text style={style.text}>{props.data.RatingOverall}</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.heading}>
          <AntIcon name={'close'} color={'#fff'} size={15} /> overall
        </Text>
        <Text style={style.text}>{props.data.IncidentsOverall}</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.heading}>
          <AntIcon
            name={'exception1'}
            color={props.data.ReputationOverall >= 0 ? '#24B533' : '#BB2124'}
            size={15}
          />{' '}
          overall
        </Text>
        <Text style={style.text}>{props.data.ReputationOverall}</Text>
      </View>
    </View>
  );
}

function DataAverage(props) {
  return (
    <View style={style.row}>
      <View style={style.textContainer}>
        <Text style={style.heading}>
          <AntIcon
            name={'solution1'}
            color={props.data.RatingAverage >= 0 ? '#24B533' : '#BB2124'}
            size={15}
          />{' '}
          average
        </Text>
        <Text style={style.text}>{props.data.RatingAverage}</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.heading}>
          <AntIcon name={'close'} color={'#fff'} size={15} /> average
        </Text>
        <Text style={style.text}>{props.data.IncidentsAverage}</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.heading}>
          <AntIcon
            name={'exception1'}
            color={props.data.ReputationAverage >= 0 ? '#24B533' : '#BB2124'}
            size={15}
          />{' '}
          average
        </Text>
        <Text style={style.text}>{props.data.ReputationAverage}</Text>
      </View>
    </View>
  );
}

function LaptimeData(props) {
  return (
    <View style={style.row}>
      <View style={style.textContainer}>
        <Text style={style.heading}>Fastest Lap</Text>
        <Text style={style.text}>{props.data.BestLaptimeOverallText}</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.heading}>Avg. Laptime</Text>
        <Text style={style.text}>{props.data.AvgLaptimeOverallText}</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.heading}>Diff. average</Text>
        <Text style={style.text}>{props.data.MaxDiffFastestLapText}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1.0,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 14,
    color: '#fff',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
});

export default RaceDataInfo;
