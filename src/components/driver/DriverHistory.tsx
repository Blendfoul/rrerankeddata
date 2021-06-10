import React, {useContext, useState} from 'react';
import {DataTable} from 'react-native-paper';
import {FlatList, RefreshControl, Text} from 'react-native';
import {styles} from '../utils/Theme';
import HistoryRow from './HistoryRow';
import {Result} from '../../types/results';
import useDriverHistory from '../../hooks/useDriverHistory';
import LoadingActivity from '../utils/LoadingActivity';
import {LocalizationContext} from '../translations/LocalizationContext';

interface DriverProps {
  username: string;
}

const DriverHistory: React.FC<DriverProps> = ({username}) => {
  const {loading, data, refetch} = useDriverHistory(username);
  const [page, setPage] = useState(0);
  const {translations} = useContext(LocalizationContext);

  if (loading) {
    return <LoadingActivity title={translations.loading.history} />;
  }

  if (data) {
    const itemsPerPage = 20;
    const from1 = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;

    const races = () => {
      const temp: Result[] = [];

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
      <DataTable style={[styles.column, styles.backgroundColorTarget]}>
        <FlatList
          data={races()}
          renderItem={({item}) => <HistoryRow race={item} />}
          keyExtractor={(item, index) => `history-${index}`}
          numColumns={1}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
        />

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
              {from1 + 1}-{data.Entries.length < to ? data.Entries.length : to}{' '}
              of {data.Entries.length}
            </Text>
          }
        />
      </DataTable>
    );
  }

  return null;
};

export default DriverHistory;
