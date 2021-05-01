import React from 'react';
import {Laptime} from '../../types/laptimes';
import {Image, StyleSheet, View} from 'react-native';
import {styles} from '../utils/Theme';
import {Caption, Title} from 'react-native-paper';

interface LeaderboardRowProps {
  item: Laptime;
  index: number;
}

const style = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  image: {
    width: 75,
    height: 50,
    resizeMode: 'contain',
  },
});

const LeaderboardRowComponent: React.FC<LeaderboardRowProps> = ({
  item,
  index,
}) => {
  return (
    <View style={[styles.container, styles.row]}>
      <View>
        <Title>#{index + 1}</Title>
      </View>
      <View style={style.container}>
        <Title style={[styles.title]}>{item.name}</Title>
        <Caption
          style={[
            styles.text,
            styles.alignCenter,
            {justifyContent: 'flex-start'},
          ]}>
          {`${Math.floor((item.laptime / 1000 / 60) << 0)}:${(
            (item.laptime / 1000) %
            60
          ).toFixed(3)}s`}
        </Caption>
      </View>
      <View style={{flex: 0}}>
        <Image
          source={{
            uri: `https://game.raceroom.com/store/image_redirect?id=${item.livery}&size=small`,
          }}
          style={style.image}
        />
      </View>
    </View>
  );
};

const LeaderboardRow = React.memo(LeaderboardRowComponent);

export default LeaderboardRow;
