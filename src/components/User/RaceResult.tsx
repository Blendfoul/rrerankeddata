import React from 'react';
import {Result} from '../../models/data/User';
import CustomCardCover from '../shared/CustomCardCover';
import {Card, Paragraph, useTheme} from 'react-native-paper';
import CarClass from '../shared/CarClass';
import useTrack from '../../hooks/useTrack';
import {StyleSheet, View} from 'react-native';
import ContentImage from '../shared/ContentImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ServerRoutes,
  ServerStackList,
} from '../../models/navigation/Navigation';

type Props = {
  data: Result;
};

type NavProps = NativeStackNavigationProp<ServerStackList, 'User'>;

const RaceResult: React.FC<Props> = ({data}) => {
  const {trackInfo} = useTrack(data.TrackLayoutId.Id);
  const classes = data.CarClasses.map(c => c.Id);
  const navigation = useNavigation<NavProps>();
  const {colors} = useTheme();

  const navigateToResult = () => {
    navigation.navigate({
      name: ServerRoutes.RESULT,
      params: {
        hash: data.RaceHash,
      },
    });
  };

  return (
    <Card style={styles.root} onPress={navigateToResult}>
      <CustomCardCover
        style={styles.cover}
        resizeMode={'cover'}
        source={{
          uri: `https://game.raceroom.com/store/image_redirect?id=${trackInfo.Id}&amp;size=big`,
        }}>
        <View
          style={[
            styles.imgContainer,
            {justifyContent: 'flex-start', flex: 1},
          ]}>
          <View style={[styles.imgContainer, {flex: 0}]}>
            <ContentImage
              source={{
                uri: `https://prod.r3eassets.com/assets/content/track/${trackInfo.Name.toLowerCase()
                  .replaceAll(' ', '-')
                  .replace('ü', 'u')}-${trackInfo.Id}-logo-original.webp`,
              }}
              resizeMode={'contain'}
              style={styles.img}
            />
          </View>
          <View style={[styles.imgContainer, {flex: 1}]}>
            <CarClass
              classId={classes}
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'flex-end',
              }}
            />
          </View>
        </View>
      </CustomCardCover>
      <Card.Content style={styles.content}>
        <View style={[styles.container]}>
          <Paragraph>{data.RatingChange}</Paragraph>
          <Icon
            name={
              data.RatingChange >= 0
                ? 'chevron-double-up'
                : 'chevron-double-down'
            }
            size={25}
            color={data.RatingChange >= 0 ? 'green' : 'red'}
          />
        </View>
        <View style={[styles.container]}>
          <Paragraph>{data.ReputationChange}</Paragraph>
          <Icon
            name={
              data.ReputationChange >= 0
                ? 'chevron-double-up'
                : 'chevron-double-down'
            }
            size={25}
            color={data.ReputationChange >= 0 ? 'green' : 'red'}
          />
        </View>
      </Card.Content>
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Icon name={'account-outline'} size={25} color={colors.text} />
          <Paragraph>{data.FinishPositionInClass}</Paragraph>
        </View>
        <View style={styles.container}>
          <Icon
            name={'account-multiple-outline'}
            size={25}
            color={colors.text}
          />
          <Paragraph>{data.PlayersCount}</Paragraph>
        </View>
        <View style={styles.container}>
          <Icon name={'clock-outline'} size={25} color={colors.text} />
          <Paragraph>
            {new Date(data.RaceFinishTime * 1000).toLocaleDateString()}
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 5,
    elevation: 3,
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cover: {
    height: 125,
  },
  img: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  content: {
    flexDirection: 'row',
    paddingVertical: 2.5,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RaceResult;
