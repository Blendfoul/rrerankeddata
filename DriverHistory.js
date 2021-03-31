import React from 'react';
import {DataTable} from 'react-native-paper';
import type {Race} from './interfaces/Profile';
import CarClass from './CarClass';
import {Pressable, StyleSheet} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

function TableCell(props) {
  return <DataTable.Cell style={props.style}>{props.text}</DataTable.Cell>;
}

const DriverHistory = ({raceData, navigation}) => {
  const races = raceData.Races.reverse();

  const onPress = (raceId: String, trackLayout: Number) => {
    navigation.navigate('Session Details', {
      hash: raceId,
      track: trackLayout,
    });
  };

  return (
    <DataTable style={{backgroundColor: 'gray'}}>
      <DataTable.Header>
        <TableCell
          text={<AntIcon name={'car'} size={25} color={'white'} />}
          style={componentStyle.flex_3}
        />
        <TableCell
          text={<AntIcon name={'user'} size={25} color={'white'} />}
          style={componentStyle.flex_1}
        />
        <TableCell
          text={<AntIcon name={'team'} size={25} color={'white'} />}
          style={componentStyle.flex_1}
        />
        <TableCell
          text={<AntIcon name={'exception1'} size={25} color={'white'} />}
          style={componentStyle.flex_1}
        />
      </DataTable.Header>
      {races.map((race: Race, index: Number) => {
        const carClass = [];
        race.CarClasses.map(classes => carClass.push(classes.Id));
        return (
          <Pressable
            onPress={onPress.bind(this, race.RaceHash, race.TrackLayoutId.Id)}
            key={index}>
            <DataTable.Row>
              <TableCell
                text={
                  <CarClass classes={carClass} size={20} imgSize={'small'} />
                }
                style={componentStyle.flex_3}
              />
              <TableCell
                text={race.FinishPosition}
                style={componentStyle.flex_1}
              />
              <TableCell
                text={race.PlayersCount}
                style={componentStyle.flex_1}
              />
              <TableCell
                text={race.IncidentPoints}
                style={componentStyle.flex_1}
              />
            </DataTable.Row>
          </Pressable>
        );
      })}
    </DataTable>
  );
};

const componentStyle = StyleSheet.create({
  flex_3: {
    flex: 3,
  },
  flex_1: {
    flex: 1,
  },
});

export default DriverHistory;
