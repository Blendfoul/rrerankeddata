import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import axios from 'axios';
import {useRaceStore} from '../../store/RaceContext';
import {Button} from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Snackbar} from 'react-native-paper';
import {styles} from '../utils/Theme';
import {search} from '../../assets/strings/en.json';

const SearchScreen = props => {
  const [text, setText] = useState('');
  const [isEnabled, setEnabled] = useState(false);
  const [isSearching, setSearching] = useState(false);
  const raceStore = useRaceStore();

  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    if (props.route?.params.id !== undefined) {
      setText(props.route.params.id);
      searchUser();
    }
  }, [props.route?.params.id, searchUser]);

  const onChangeText = (text: String) => {
    if (text.length === 0) {
      setEnabled(false);
    } else if (!isEnabled) {
      setEnabled(true);
    }

    setText(text);
    raceStore.setSearchDriver(text);
  };

  const searchUser = useCallback(async () => {
    if (text.length > 0) {
      raceStore.setDriver(null);
      const source = axios.CancelToken.source();
      setEnabled(false);
      setSearching(true);
      try {
        const response = await axios(
          `https://game.raceroom.com/utils/user-info/${text}`,
          {
            cancelToken: source.token,
          },
        );

        if (response.data.hasOwnProperty('error')) {
          setSearching(false);
          setVisible(true);
        } else {
          setSearching(false);
          props.navigation.navigate('Details', text);
          setText('');
        }
      } catch (e) {
        console.error('[Search Screen] ' + e.message);
      }

      setEnabled(true);
      return () => {
        source.cancel();
      };
    }
  }, [props.navigation, text]);

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
        onChangeText={onChangeText}
        value={text}
        placeholder={search.placeholder}
      />
      <View style={componentStyle.buttonWidth}>
        <Button
          onPress={searchUser}
          title={search.search}
          iconRight
          icon={<AntIcon name={'user'} color={'#fff'} size={25} />}
          buttonStyle={{backgroundColor: 'green'}}
          loading={isSearching}
        />
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: onDismissSnackBar,
        }}>
        Driver with username {text} not found!
      </Snackbar>
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
  },
  buttonWidth: {width: '90%'},
});

export default SearchScreen;
