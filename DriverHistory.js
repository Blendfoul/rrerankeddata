import React from 'react';
import {DataTable} from 'react-native-paper';
import type {Profile, Race} from './interfaces/Profile';
import CarClass from './CarClass';
import {Pressable} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

const DriverHistory = (props: {data: Profile}) => {
  const races = props.data.raceList.GetUserMpRatingProgressResult.Entries.reverse();

  const onPress = (raceId: String, trackLayout: Number) => {
    props.navigation.navigate('Session Details', {
      hash: raceId,
      track: trackLayout,
    });
  };

  return (
    <DataTable style={{backgroundColor: 'gray', marginTop: 10}}>
      <DataTable.Header>
        <DataTable.Cell style={{flex: 3}}>
          <AntIcon name={'car'} size={25} color={'white'} />
        </DataTable.Cell>
        <DataTable.Cell numeric style={{flex: 1}}>
          <AntIcon name={'user'} size={25} color={'white'} />
        </DataTable.Cell>
        <DataTable.Cell numeric style={{flex: 1}}>
          <AntIcon name={'team'} size={25} color={'white'} />
        </DataTable.Cell>
        <DataTable.Cell numeric style={{flex: 1}}>
          <AntIcon name={'exception1'} size={25} color={'white'} />
        </DataTable.Cell>
      </DataTable.Header>
      {races.map((race: Race, index: Number) => {
        const carClass = [];
        race.CarClasses.map(classes => carClass.push(classes.Id));
        return (
          <Pressable
            onPress={onPress.bind(this, race.RaceHash, race.TrackLayoutId.Id)}
            key={index}>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 3}}>
                <CarClass classes={carClass} size={20} imgSize={'thumb'} />
              </DataTable.Cell>
              <DataTable.Cell numeric style={{flex: 1}}>
                {race.FinishPosition}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{flex: 1}}>
                {race.PlayersCount}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{flex: 1}}>
                {race.IncidentPoints}
              </DataTable.Cell>
            </DataTable.Row>
          </Pressable>
        );
      })}
    </DataTable>
  );
};

export default DriverHistory;
