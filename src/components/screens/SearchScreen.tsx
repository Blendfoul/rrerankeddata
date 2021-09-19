import React, {useCallback, useContext} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Avatar, Card, Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';
import useSearch from '../../hooks/useSearch';
import {SearchResult} from '../../types/resultData';
import {StackNavigationProp} from '@react-navigation/stack';

interface UserItemProps {
  data: SearchResult;
}

const UserItem: React.FC<UserItemProps> = ({data}) => {
  const [state, dispatch] = useRaceContext();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const selectUser = useCallback(() => {
    dispatch({
      type: ReducerActions.SET_SEARCH_DRIVER,
      payload: data.meta_data.slug,
    });
    navigation.navigate({
      name: 'driverDetails',
      params: {
        data: data.meta_data.slug,
      },
    });
  }, [data.meta_data.slug, dispatch, navigation]);

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
  const {users, loading, source} = useSearch();

  const handleChange = (text: string) => {
    source.cancel();
    dispatch({type: ReducerActions.SET_SEARCH_DRIVER, payload: text});
  };

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
        refreshing={loading}
        data={users}
        refreshControl={<RefreshControl refreshing={loading} />}
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
