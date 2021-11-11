import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import SearchCard from '../components/shared/SearchCard';
import useSearch from '../hooks/useSearch';
import {useTranslation} from 'react-i18next';

const SearchScreen: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const {users, loading} = useSearch(value);
  const {t} = useTranslation();
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
        placeholder={t('search.placeholder')}
        autoFocus
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
