import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {FlatList, ImageBackground, Text, View} from 'react-native';
import {styles} from '../Theme';
import TextContainer from '../TextContainer';
import type {Driver} from '../interfaces/Driver';
import FastImage from 'react-native-fast-image';
import { useRaceStore } from "../store/RaceContext";

const Stack = createStackNavigator();

const RankingNavigator = ({route, navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Ranking'}
        component={RankingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RankingNavigator;

const RankingScreen = () => {
  const raceStore = useRaceStore();

  return (
    <ImageBackground
      source={require('../assets/bg_home.png')}
      style={{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      }}
      imageStyle={{opacity: 0.8}}
      resizeMethod={'scale'}>
      <FlatList
        data={raceStore.Ratings}
        keyExtractor={item => item.UserId}
        renderItem={RankingItem}
        removeClippedSubviews={true}
        initialNumToRender={100}
      />
    </ImageBackground>
  );
};

const RankingItem = ({item, index}: {item: Driver}) => {
  return (
    <View
      style={[
        styles.row,
        styles.backgroundColor,
        {
          marginVertical: 2.5,
          marginLeft: 5,
          marginRight: 5,
          paddingVertical: 5,
        },
      ]}>
      <View
        style={[
          styles.column,
          styles.justifyCenter,
          styles.alignCenter,
          {flex: 0.25},
        ]}>
        <FastImage
          style={{width: 50, height: 50}}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: 'http://game.raceroom.com/game/user_avatar/' + item.UserId,
            priority: FastImage.priority.normal,
          }}
        />
      </View>
      <View key={item.UserId} style={styles.column}>
        <View style={[styles.row, styles.alignCenter]}>
          <Text style={[styles.column, styles.text]}>{item.Fullname}</Text>
          <Text
            style={[
              styles.column,
              styles.text,
              {textAlign: 'right', marginHorizontal: 10},
            ]}>
            #{index + 1}
          </Text>
        </View>
        <View style={[styles.row]}>
          <TextContainer
            title={'Reputation'}
            titleSize={12}
            textSize={11}
            text={item.Reputation}
            textAlign={'left'}
          />
          <TextContainer
            title={'Rating'}
            titleSize={12}
            textSize={11}
            text={item.Rating}
          />
          <TextContainer
            title={'Races'}
            titleSize={12}
            textSize={11}
            text={item.RacesCompleted}
          />
        </View>
      </View>
    </View>
  );
};
