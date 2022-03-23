import React, {useState} from 'react';
import {DataTable, Paragraph} from 'react-native-paper';
import {FlatList, ListRenderItem} from 'react-native';
import {useSelector} from 'react-redux';
import {ratingSelector, ratingsLength} from '../store/slices/Ratings';
import {Rating} from '../models/data/Ranked';
import DriverCard from '../components/shared/DriverCard';

type Props = {};

const itemsPerPage = 50;

const RankingScreen: React.FC<Props> = () => {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(50);
  const [page, setPage] = useState<number>(0);
  const ratings = useSelector(ratingSelector(from, to));
  const length = useSelector(ratingsLength);

  const renderItem: ListRenderItem<Rating> = ({item}) => (
    <DriverCard driver={item} />
  );

  const pageChange = (value: number) => {
    setFrom(itemsPerPage * value);
    setTo(itemsPerPage + itemsPerPage * value);
    setPage(value);
  };

  return (
    <DataTable>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.floor(length / itemsPerPage)}
        onPageChange={pageChange}
        label={
          <Paragraph>
            {from + 1}-{to} of {length}
          </Paragraph>
        }
      />
      <FlatList
        data={ratings}
        renderItem={renderItem}
        maxToRenderPerBatch={10}
        keyExtractor={item => `rank-${item.UserId}`}
      />
    </DataTable>
  );
};

export default RankingScreen;
