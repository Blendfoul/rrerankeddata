import React, {useCallback, useContext} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {styles} from '../../utils/Theme';
import {Avatar, Caption, Paragraph, Title} from 'react-native-paper';
//@ts-ignore
import Label, {Orientation} from 'react-native-label';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {RaceResult} from '../../../types/resultData';
import {useNavigation} from '@react-navigation/core';
import {LocalizationContext} from '../../translations/LocalizationContext';

interface RaceRowProps {
  data: RaceResult;
}

interface ContentProps {
  data: RaceResult;
}

const Content: React.FC<ContentProps> = ({data}) => {
  const bestLap = useCallback(() => {
    const value = data.Laps.filter(lap => lap.Time > 0);

    if (value.length) {
      const lap = value.reduce((acc, loc) => (acc.Time < loc.Time ? acc : loc));
      return `${Math.floor((lap.Time / 1000 / 60) << 0)}:${(
        (lap.Time / 1000) %
        60
      ).toFixed(3)}s`;
    } else {
      return data.Laps[0].Time;
    }
  }, [data.Laps]);

  return (
    <View style={styles.row}>
      <View style={[styles.justifyCenter, {flex: 0, alignItems: 'center'}]}>
        <Avatar.Image
          source={{
            uri: `https://game.raceroom.com/game/user_avatar/${data.UserId}`,
          }}
          size={50}
        />
        <Image
          source={{
            uri: `https://game.raceroom.com/store/image_redirect?id=${data.LiveryId.Id}&amp;&size=small`,
          }}
          style={{width: 75, height: 100}}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.column}>
        <Title style={componentStyle.title}>{data.FullName}</Title>
        <Caption style={componentStyle.caption}>{data.Team}</Caption>
        <View
          style={[
            styles.row,
            styles.justifyAround,
            styles.alignCenter,
            {paddingHorizontal: 15, marginLeft: 10},
          ]}>
          <View style={[styles.row, styles.justifyCenter, styles.alignCenter]}>
            <AntIcon name={'clockcircleo'} size={15} color={'#fff'} />
            <Paragraph
              style={[componentStyle.caption, {paddingHorizontal: 10}]}>
              {bestLap()}
            </Paragraph>
          </View>
          <View style={[styles.row, styles.justifyCenter, styles.alignCenter]}>
            <AntIcon name={'user'} size={15} color={'#fff'} />
            <Paragraph
              style={[componentStyle.caption, {paddingHorizontal: 10}]}>
              {data.Laps[data.Laps.length - 1].PositionInClass !== undefined
                ? data.Laps[data.Laps.length - 1].PositionInClass
                : data.FinishPosition}
            </Paragraph>
          </View>
        </View>
        <View style={[styles.row, styles.justifyEvenly, styles.alignCenter]}>
          <Paragraph
            style={[
              {
                backgroundColor: data.RatingChange >= 0 ? '#24B533' : '#BB2124',
                borderRadius: 2.5,
                paddingVertical: 5,
                paddingHorizontal: 10,
              },
            ]}>
            <AntIcon name={'solution1'} size={15} color={'white'} />{' '}
            {data.RatingChange}
          </Paragraph>
          <Paragraph
            style={[
              {
                backgroundColor:
                  data.ReputationChange >= 0 ? '#24B533' : '#BB2124',
                borderRadius: 2.5,
                paddingVertical: 5,
                paddingHorizontal: 10,
              },
            ]}>
            <AntIcon name={'exception1'} size={15} color={'white'} />{' '}
            {data.ReputationChange}
          </Paragraph>
        </View>
      </View>
    </View>
  );
};

const componentStyle = StyleSheet.create({
  title: {color: 'white', textAlign: 'center', fontSize: 15},
  caption: {color: '#afafaf', textAlign: 'center'},
});

const RaceRow: React.FC<RaceRowProps> = ({data}) => {
  const navigation = useNavigation();
  const {translations} = useContext(LocalizationContext);

  const navigate = () => {
    navigation.navigate({
      name: translations.navigation.race,
      params: {
        data: data,
      },
    });
  };

  const findMedal = useCallback(() => {
    switch (data.Laps[data.Laps.length - 1].PositionInClass) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
    }
  }, [data.Laps]);

  return (
    <TouchableOpacity style={styles.container} onPress={navigate}>
      {data.FinishPositionInClass <= 3 ? (
        <Label
          orientation={Orientation.TOP_RIGHT}
          title={findMedal()}
          color={'#4f4f4f'}
          distance={5}
          style={{fontSize: 15, padding: 2.5}}>
          <Content data={data} />
        </Label>
      ) : (
        <Content data={data} />
      )}
    </TouchableOpacity>
  );
};

export default RaceRow;
