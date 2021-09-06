import React, {useContext} from 'react';
import {useRaceContext} from '../../store/RaceContext';
import {LocalizationContext} from '../translations/LocalizationContext';
import useRating from '../../hooks/useRating';
import {DataTable} from 'react-native-paper';
import {styles} from '../utils/Theme';
import LoadingActivity from '../utils/LoadingActivity';
import {FlatList, Text} from 'react-native';
import FriendCard from '../friends/FriendCard';

const RatingScreen: React.FC = () => {
  const [state] = useRaceContext();
  const {translations} = useContext(LocalizationContext);
  const {loading, data, from1, to, itemsPerPage, page, pageChange} =
    useRating();

  if (loading) {
    return <LoadingActivity title={translations.loading.leaderboard} />;
  }

  return (
    <DataTable style={[styles.column, styles.backgroundColorTarget]}>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <FriendCard
            item={item}
            rating
            ratingPosition={itemsPerPage * page + index + 1}
          />
        )}
        keyExtractor={(item, index) => `ranking-row-${index}`}
      />
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.floor(state.ratings.length / itemsPerPage)}
        onPageChange={pageChange}
        label={
          <Text style={styles.text}>
            {from1 + 1}-{to} of {state.ratings.length}
          </Text>
        }
      />
    </DataTable>
  );
};

export default RatingScreen;
