import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import axios from 'axios';
import {useRaceStore} from './store/RaceContext';
import {Button} from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';

const SearchScreen = ({route, navigation}) => {
  const [text, setText] = useState('');
  const [isEnabled, setEnabled] = useState(false);
  const raceStore = useRaceStore();

  const onChangeText = (text: String) => {
    if (text.length === 0) {
      setEnabled(false);
    } else if (!isEnabled) {
      setEnabled(true);
    }

    setText(text);
    raceStore.setSearchDriver(text);
  };

  const searchUser = async () => {
    if (text.length > 0) {
      const source = axios.CancelToken.source();
      setEnabled(false);
      try {
        await axios(`https://game.raceroom.com/users/${text}/?json`, {
          method: 'HEAD',
          cancelToken: source.token,
        });

        navigation.navigate('Details', text);
      } catch (e) {
        ToastAndroid.show(`User ${text} not found!`, ToastAndroid.SHORT);
      }

      setEnabled(true);
      return () => {
        source.cancel();
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={'Driver Username'}
      />
      <View style={styles.buttonWidth}>
        <Button
          onPress={searchUser}
          title="Search "
          iconRight
          icon={<AntIcon name={'user'} color={'#fff'} size={25} />}
          buttonStyle={{backgroundColor: 'green'}}
          disabled={!isEnabled}
        />
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
