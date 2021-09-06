import React, {useCallback, useContext} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Avatar, Card, Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';
import useSearch from '../../hooks/useSearch';
import LoadingActivity from '../utils/LoadingActivity';
import {SearchResult} from '../../types/resultData';
import {StackNavigationProp} from '@react-navigation/stack';

interface UserItemProps {
  data: SearchResult;
}

const UserItem: React.FC<UserItemProps> = ({data}) => {
  const [state, dispatch] = useRaceContext();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {translations} = useContext(LocalizationContext);

  const selectUser = useCallback(() => {
    dispatch({
      type: ReducerActions.SET_SEARCH_DRIVER,
      payload: data.meta_data.slug,
    });
    navigation.navigate({
      name: translations.search.title.details,
      params: {
        data: data.meta_data.slug,
      },
    });
  }, [
    data.meta_data.slug,
    dispatch,
    navigation,
    translations.search.title.details,
  ]);

  return (
    <Card style={cardStyle.root} onPress={selectUser}>
      <Card.Content style={cardStyle.avatar}>
        <Avatar.Image
          source={{
            uri: data.image,
          }}
        />
      </Card.Content>
      <Card.Title title={data.name} subtitle={data.meta_data.slug} />
    </Card>
  );
};

const SearchScreen: React.FC = () => {
  const {translations} = useContext(LocalizationContext);
  const [state, dispatch] = useRaceContext();
  const {users, loading} = useSearch();

  const handleChange = (text: string) =>
    dispatch({type: ReducerActions.SET_SEARCH_DRIVER, payload: text});

  if (loading) {
    return <LoadingActivity title={translations.loading.search} />;
  }

  return (
    <>
      <Searchbar
        style={componentStyle.input}
        onChangeText={handleChange}
        allowFontScaling={false}
        value={state.searchDriver}
        placeholder={translations.search.placeholder}
        selectionColor={'gray'}
      />
      <FlatList
        data={users}
        numColumns={2}
        keyExtractor={(item, index) => `key-${index}`}
        renderItem={({item}) =>
          item.type === 'user' ? <UserItem data={item} /> : null
        }
      />
    </>
  );
};

const componentStyle = StyleSheet.create({
  input: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
});

const cardStyle = StyleSheet.create({
  root: {
    margin: 2.5,
    display: 'flex',
    flex: 1,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SearchScreen;
