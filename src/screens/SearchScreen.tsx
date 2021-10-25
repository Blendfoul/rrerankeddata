import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import SearchCard from '../components/shared/SearchCard';
import useSearch from '../hooks/useSearch';

const SearchScreen: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const {users} = useSearch(value);

  const searchForUser = (text: string) => setValue(text);

  const renderItem: ListRenderItem<any> = ({item}) => (
    <SearchCard item={item} />
  );

  return (
    <>
      <Searchbar
        onChangeText={searchForUser}
        style={styles.bar}
        value={value}
      />
      <FlatList
        data={users}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.container}
        keyExtractor={item => item.name}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bar: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  container: {
    paddingHorizontal: 10,
  },
});

export default SearchScreen;
