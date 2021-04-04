import React, {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
import type {Race} from '../../interfaces/Profile';
import CarClass from '../utils/CarClass';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TrackImage from '../utils/TrackImage';
import axios from 'axios';
import {styles} from '../utils/Theme';
import type {Driver} from '../../interfaces/Driver';

function TableCell(props) {
  return <DataTable.Cell style={props.style}>{props.text}</DataTable.Cell>;
}

const DriverHistory = ({username, navigation}) => {
  const [data, setData] = useState({TotalEntries: 0, Entries: []});
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getRaces = async () => {
      if (refresh) {
        const response = await axios(
          `https://game.raceroom.com/users/${username}/career/?json`,
          {cancelToken: source.token},
        );

        setData({
          Entries: response.data.context.c.raceList.GetUserMpRatingProgressResult.Entries.reverse(),
          TotalEntries:
            response.data.context.c.raceList.GetUserMpRatingProgressResult
              .TotalEntries,
        });
        setRefresh(false);
      }
    };

    getRaces();

    return () => source.cancel();
  }, [username, refresh]);

  const itemsPerPage = 20;
  const [page, setPage] = React.useState(0);
  const from1 = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const races = () => {
    const temp = [];

    if (data.Entries.length > 0) {
      for (let index = from1; index < to; index++) {
        temp.push(data.Entries[index]);
      }
    }

    return temp;
  };

  return (
    <ScrollView
      style={[styles.column, styles.backgroundColor]}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => setRefresh(true)}
        />
      }>
      <DataTable style={{backgroundColor: 'gray'}}>
        <DataTable.Header>
          <TableCell
            text={<AntIcon name={'car'} size={25} color={'white'} />}
            style={componentStyle.flex_3}
          />
          <TableCell text={null} style={componentStyle.flex_1} />
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

        {races().map((race: Race, index: Number) => (
          <RaceRow race={race} key={index} navigation={navigation} />
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.floor(data.Entries / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={
            <Text style={styles.text}>
              {from1 + 1}-{to} of {data.Entries.length}
            </Text>
          }
        />
      </DataTable>
    </ScrollView>
  );
};

const RaceRow = ({race, navigation}: {race: Race}) => {
  const racePress = (raceId: String, trackLayout: Number) => {
    navigation.navigate('Session Details', {
      hash: raceId,
      track: trackLayout,
    });
  };

  return (
    <DataTable.Row onPress={() => racePress(race.RaceHash, race.TrackLayoutId)}>
      <TableCell
        text={
          <CarClass
            classes={race.CarClasses.map(classes => classes.Id)}
            size={20}
            imgSize={'small'}
          />
        }
        style={componentStyle.flex_3}
      />
      <TableCell
        text={
          <TrackImage logo={true} trackId={race.TrackLayoutId.Id} size={25} />
        }
        style={[componentStyle.flex_1, componentStyle.trackLogo]}
      />
      <TableCell text={race.FinishPosition} style={componentStyle.flex_1} />
      <TableCell text={race.PlayersCount} style={componentStyle.flex_1} />
      <TableCell text={race.IncidentPoints} style={componentStyle.flex_1} />
    </DataTable.Row>
  );
};

const componentStyle = StyleSheet.create({
  flex_3: {
    flex: 4,
  },
  flex_1: {
    flex: 1,
  },
  trackLogo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DriverHistory;
