import React, {useCallback, useContext, useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {useRaceStore} from '../../store/RaceContext';
import {styles} from '../utils/Theme';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Image} from 'react-native-elements';
import TextContainer from '../utils/TextContainer';
import {AxiosRequestConfig} from 'axios';

const UserItem = ({data, navigation, setText, translations}) => {
  const raceStore = useRaceStore();

  const selectUser = useCallback(() => {
    raceStore.setSearchDriver(data?.meta_data.slug);
    navigation.navigate(
      translations.search.title.details,
      data?.meta_data.slug,
    );
    setText('');
  }, [
    data?.meta_data.slug,
    navigation,
    raceStore,
    setText,
    translations.search.title.details,
  ]);

  return (
    <TouchableOpacity
      style={[
        styles.row,
        styles.alignCenter,
        {
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
          paddingVertical: 5,
          paddingHorizontal: 10,
        },
      ]}
      onPress={selectUser}>
      <Image
        source={{uri: data?.image}}
        style={[styles.column, componentStyle.userImage]}
      />
      <TextContainer title={data?.name} text={data?.meta_data.slug} />
    </TouchableOpacity>
  );
};

const SearchScreen = props => {
  const [text, setText] = useState('');
  const [users, setUsers] = useState([]);
  const {translations} = useContext(LocalizationContext);
  const raceStore = useRaceStore();

  let cancelRequest = null;
  const CancelToken = axios.CancelToken;

  const search = async (text: String) => {
    setText(text);

    const options: AxiosRequestConfig = {
      cancelToken: new CancelToken(function executor(c) {
        cancelRequest = c;
      }),
      baseURL: 'https://game.raceroom.com/',
    };

    try {
      const response = await axios('/search?query=' + text, options);

      if (response.data.length !== 0) {
        setUsers(response.data);
      } else {
        const data = raceStore.Ratings.find(
          driver =>
            driver.Username.toLowerCase() === text.toLowerCase() ||
            driver.Fullname.toLowerCase() === text.toLowerCase(),
        );

        if (data !== undefined) {
          setUsers([
            {
              name: data.Fullname,
              image: `https://game.raceroom.com/game/user_avatar/${data.UserId}`,
              meta_data: {slug: data.Username},
              type: 'user',
            },
          ]);
        }
      }
    } catch (err) {
      if (axios.isCancel()) {
        console.error('Request cancelled');
      }
      console.error(err.message);
    }
  };

  const handleChange = async (text: String) => {
    cancelRequest && cancelRequest();
    await search(text);
  };

  return (
    <SafeAreaView
      style={[
        styles.column,
        styles.alignCenter,
        styles.justifyCenter,
        styles.backgroundColor,
      ]}>
      <TextInput
        style={componentStyle.input}
        onChangeText={handleChange}
        value={text}
        placeholder={translations.search.placeholder}
      />
      <View style={componentStyle.buttonWidth}>
        <FlatList
          data={users}
          keyExtractor={({item}, index) => index}
          renderItem={({item}) =>
            item.type === 'user' ? (
              <UserItem
                data={item}
                navigation={props.navigation}
                setText={setText}
                translations={translations}
              />
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

const componentStyle = StyleSheet.create({
  input: {
    width: '90%',
    textAlign: 'center',
    height: 50,
    margin: 12,
    backgroundColor: 'gray',
    borderRadius: 2,
    fontWeight: 'bold',
    flex: 0,
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

export default SearchScreen;
