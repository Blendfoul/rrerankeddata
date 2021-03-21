import React from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import CarClass from './CarClass';

const Race: props => Node = (props: props) => {
  const onRacePress = () => {
    props.navigation.navigate('Race Details', props.data);
    console.log(props.data.Server.Settings.ServerName + ' pressed!');
  };

  return (
    <Pressable onPress={onRacePress}>
      <View style={raceStyle.race}>
        <Image
          style={raceStyle.logo}
          source={{
            uri: props.data.Server.Settings.Thumbnail,
          }}
        />
        <View style={raceStyle.content}>
          <Text style={raceStyle.text}>
            {props.data.Server.Settings.ServerName}
          </Text>
          <CarClass liveries={props.data.Server.Settings.LiveryId} size={25} />
        </View>
      </View>
    </Pressable>
  );
};

const raceStyle = StyleSheet.create({
  race: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2f2f2f',
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  text: {
    color: '#fff',
  },
  logo: {
    width: 125,
    resizeMode: 'stretch',
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
  },
});

export default Race;
