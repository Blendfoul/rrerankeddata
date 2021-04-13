import React, {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
import type {Race} from '../../interfaces/Profile';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import axios from 'axios';
import {styles} from '../utils/Theme';
import HistoryRow from './HistoryRow';

const DriverHistory = ({username, navigation}) => {
  const [data, setData] = useState({TotalEntries: 0, Entries: []});
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getRaces = async () => {
      if (refresh) {
        const response = await axios(`/users/${username}/career/?json`, {
          cancelToken: source.token,
        });

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
        if (index === data.Entries.length) {
          break;
        }
        temp.push(data.Entries[index]);
      }
    }

    return temp;
  };

  return (
    <DataTable style={[styles.column, {backgroundColor: 'gray'}]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
          />
        }>
        {races().map((race: Race, index: Number) => (
          <HistoryRow race={race} key={index} navigation={navigation} />
        ))}
      </ScrollView>

      <DataTable.Pagination
        page={page}
        numberOfPages={
          Math.floor(data.Entries.length / itemsPerPage) * itemsPerPage <
          data.Entries.length
            ? Math.floor(data.Entries.length / itemsPerPage) + 1
            : Math.floor(data.Entries.length / itemsPerPage)
        }
        onPageChange={page => setPage(page)}
        label={
          <Text style={styles.text}>
            {from1 + 1}-{data.Entries.length < to ? data.Entries.length : to} of{' '}
            {data.Entries.length}
          </Text>
        }
      />
    </DataTable>
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
