import React, {useCallback, useContext} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../utils/Theme';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Avatar, Caption, Searchbar, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {useRaceContext} from '../../store/RaceContext';
import {ReducerActions} from '../../store/StoreReducer';
import useSearch from '../../hooks/useSearch';
import LoadingActivity from '../utils/LoadingActivity';
import {SearchResult} from '../../types/resultData';

interface UserItemProps {
  data: SearchResult;
}

const UserItem: React.FC<UserItemProps> = ({data}) => {
  const [state, dispatch] = useRaceContext();
  const navigation = useNavigation();
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
    <TouchableOpacity style={cardStyle.root} onPress={selectUser}>
      <View style={cardStyle.logoContainer}>
        <Avatar.Image
          style={cardStyle.backgroundAvatar}
          source={{
            uri: data.image,
          }}
        />
      </View>
      <View style={cardStyle.textContainer}>
        <Title style={cardStyle.title}>{data.name}</Title>
        <Caption style={cardStyle.caption}>{data.meta_data.slug}</Caption>
      </View>
    </TouchableOpacity>
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
    <SafeAreaView
      style={[
        styles.column,
        styles.alignCenter,
        styles.justifyCenter,
        styles.backgroundColorTarget,
      ]}>
      <View
        style={[
          styles.row,
          styles.alignCenter,
          styles.justifyCenter,
          {flex: 0},
        ]}>
        <Searchbar
          style={componentStyle.input}
          onChangeText={handleChange}
          inputStyle={{color: 'white'}}
          allowFontScaling={false}
          value={state.searchDriver}
          iconColor={'white'}
          placeholder={translations.search.placeholder}
          placeholderTextColor={'white'}
          selectionColor={'gray'}
          theme={{colors: {text: 'white'}}}
        />
      </View>
      <View style={componentStyle.buttonWidth}>
        <FlatList
          data={users}
          keyExtractor={(item, index) => `key-${index}`}
          numColumns={2}
          renderItem={({item}) =>
            item.type === 'user' ? <UserItem data={item} /> : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

const componentStyle = StyleSheet.create({
  input: {
    textAlign: 'center',
    backgroundColor: '#2f2f2f',
    fontWeight: 'bold',
    flex: 1,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  buttonWidth: {
    width: '100%',
    flex: 1,
  },
  userImage: {
    width: 50,
    height: 50,
  },
});

const cardStyle = StyleSheet.create({
  root: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2f2f2f',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: '#f4f4f4',
    margin: 3,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    color: '#fff',
  },
  caption: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    color: '#dbdbdb',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    padding: 5,
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  backgroundAvatar: {
    backgroundColor: '#2f2f2f',
  },
});
export default SearchScreen;
