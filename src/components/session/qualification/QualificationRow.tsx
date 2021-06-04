import {QualiResult} from '../../../types/resultData';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/core';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {styles} from '../../utils/Theme';
import {Avatar, Paragraph, Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LocalizationContext} from '../../translations/LocalizationContext';

interface QualificationRowProps {
  item: QualiResult;
}

const componentStyle = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  flex_2: {
    flex: 2,
  },
  rowHeight: {
    height: 75,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  imageCar: {
    width: 62.5,
    height: 50,
  },
  gray: {
    backgroundColor: 'gray',
  },
});

const QualificationRow: React.FC<QualificationRowProps> = ({item}) => {
  const navigation = useNavigation();
  const {translations} = useContext(LocalizationContext);

  const navigate = () => {
    navigation.navigate({
      name: translations.navigation.qualification,
      params: {
        data: item,
      },
    });
  };

  const bestLap = () => {
    const value = item.Laps.filter(lap => lap.Time > 0);

    if (value.length) {
      const lap = value.reduce((acc, loc) => (acc.Time < loc.Time ? acc : loc));
      return `${Math.floor((lap.Time / 1000 / 60) << 0)}:${(
        (lap.Time / 1000) %
        60
      ).toFixed(3)}s`;
    } else {
      return item.Laps[0].Time;
    }
  };

  return (
    <TouchableOpacity style={styles.root} onPress={navigate}>
      <View style={[styles.row, {paddingVertical: 10}]}>
        <View style={[styles.alignCenter, styles.justifyCenter, {flex: 0}]}>
          <Avatar.Image
            source={{
              uri: `https://game.raceroom.com/game/user_avatar/${item.UserId}`,
            }}
            size={50}
          />
        </View>
        <View style={[styles.column, styles.alignCenter, styles.justifyCenter]}>
          <View
            style={[
              styles.row,
              styles.alignCenter,
              styles.justifySpaceBetween,
              styles.paddingHorizontal5,
            ]}>
            <Title
              style={{
                width: '100%',
                textAlign: 'center',
                color: 'white',
                fontSize: 15,
              }}>
              {item.FullName}
            </Title>
          </View>
          <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
            <AntDesign name={'clockcircleo'} size={15} color={'#fff'} />
            <Paragraph style={[styles.paddingHorizontal5, {color: 'white'}]}>
              {bestLap()}
            </Paragraph>
          </View>
        </View>
        <View
          style={[
            styles.column,
            styles.alignCenter,
            styles.justifyCenter,
            {flex: 0},
          ]}>
          <Image
            source={{
              uri: `https://game.raceroom.com/store/image_redirect?id=${item.LiveryId.Id}&amp;&size=small`,
            }}
            style={componentStyle.imageCar}
            resizeMode={'contain'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QualificationRow;
