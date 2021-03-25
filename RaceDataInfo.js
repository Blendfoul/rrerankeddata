import React from 'react';
import type {RaceInfo} from './RaceData';
import {StyleSheet, Text, View} from 'react-native';

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
    <>
      <View style={style.textContainer}>
        <Text style={style.heading}>Rat. overall</Text>
        <Text style={style.heading}>Inc. overall</Text>
        <Text style={style.heading}>Rep. overall</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.text}>{props.data.RatingOverall}</Text>
        <Text style={style.text}>{props.data.IncidentsOverall}</Text>
        <Text style={style.text}>{props.data.ReputationOverall}</Text>
      </View>
    </>
  );
}

function DataAverage(props) {
  return (
    <>
      <View style={style.textContainer}>
        <Text style={style.heading}>Drivers</Text>
        <Text style={style.heading}>Inc. average</Text>
        <Text style={style.heading}>Rep. average</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.text}>{props.data.Drivers}</Text>
        <Text style={style.text}>{props.data.IncidentsAverage}</Text>
        <Text style={style.text}>{props.data.ReputationAverage}</Text>
      </View>
    </>
  );
}

function LaptimeData(props) {
  return (
    <>
      <View style={style.textContainer}>
        <Text style={style.heading}>Fastest Lap</Text>
        <Text style={style.heading}>Avg. Laptime</Text>
        <Text style={style.heading}>Diff. average</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.text}>{props.data.BestLaptimeOverallText}</Text>
        <Text style={style.text}>{props.data.AvgLaptimeOverallText}</Text>
        <Text style={style.text}>{props.data.MaxDiffFastestLapText}</Text>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1.25,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 14,
    color: '#fff',
  },
  textContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    flex: 1.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RaceDataInfo;
