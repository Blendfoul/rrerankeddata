import React, {useEffect, useRef, useState} from 'react';
import {Searchbar, TextInput} from 'react-native-paper';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import SearchCard from '../components/shared/SearchCard';
import useSearch from '../hooks/useSearch';

const SearchScreen: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const {users, loading} = useSearch(value);
  const ref = useRef<typeof TextInput>(null);
  const searchForUser = (text: string) => setValue(text);

  const renderItem: ListRenderItem<any> = ({item}) => (
    <SearchCard item={item} />
  );

  useEffect(() => {
    ref?.focus();
  }, []);

  return (
    <>
      <Searchbar
        onChangeText={searchForUser}
        style={styles.bar}
        value={value}
        ref={ref}
      />
      <FlatList
        data={users}
        refreshing={loading}
        refreshControl={<RefreshControl refreshing={loading} />}
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
