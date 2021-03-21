import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  ToastAndroid,
  View,
} from 'react-native';
import axios from 'axios';

const SearchScreen = ({route, navigation}) => {
  const [text, setText] = useState('');

  const onChangeText = (text: String) => {
    setText(text);
  };

  const searchUser = async () => {
    const source = axios.CancelToken.source();

    try {
      await axios(`https://game.raceroom.com/users/${text}/?json`, {
        method: 'HEAD',
        cancelToken: source.token,
      });

      //TODO: Navigate to profile component
      ToastAndroid.show('will navigate', ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show(`User ${text} not found!`, ToastAndroid.SHORT);
    }

    return () => {
      source.cancel();
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={'Username'}
      />
      <View style={styles.buttonWidth}>
        <Button onPress={searchUser} title="Search" color="green" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f2f2f',
  },
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
