import React from 'react';
import {Caption, Card, Paragraph} from 'react-native-paper';
import CarClass from '../utils/CarClass';
import TrackImage from '../utils/TrackImage';
import {StyleSheet} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/core';
import {GenericIdData, Result} from '../../types/results';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RaceStackList} from '../../types/NavigatorProps';

interface HistoryProps {
  race: Result;
}

const HistoryRowComponent: React.FC<HistoryProps> = ({race}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RaceStackList>>();

  const racePress = (raceId: string, trackLayout: GenericIdData) => {
    navigation.navigate({
      name: 'sessionDetails',
      params: {
        hash: raceId,
        track: trackLayout,
      },
    });
  };
  const classId = race.CarClasses.map((classes: {Id: number}) => classes.Id);
  const style = StyleSheet.create({
    root: {
      margin: 5,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 5,
    },
    caption: {
      textAlign: 'center',
      fontSize: 12,
      marginHorizontal: 7.5,
    },
  });

  return (
    <Card
      style={style.root}
      onPress={() => racePress(race.RaceHash, race.TrackLayoutId)}
      elevation={3}>
      <TrackImage layoutId={race.TrackLayoutId.Id} size={55} />
      <Card.Content style={style.content}>
        <CarClass classId={classId} size={35} imgSize={'small'} />
      </Card.Content>
      <Card.Content style={style.content}>
        <Caption style={style.caption}>
          <AntIcon name={'user'} size={15} /> {race.FinishPositionInClass}
        </Caption>
        <Caption style={style.caption}>
          <AntIcon name={'team'} size={15} /> {race.PlayersCount}
        </Caption>
        <Paragraph
          style={[
            style.caption,
            {
              backgroundColor: race.RatingChange >= 0 ? '#24B533' : '#BB2124',
              borderRadius: 2.5,
              padding: 5,
            },
          ]}>
          <AntIcon name={'solution1'} size={15} /> {race.RatingChange}
        </Paragraph>
        <Paragraph
          style={[
            style.caption,
            {
              backgroundColor:
                race.ReputationChange >= 0 ? '#24B533' : '#BB2124',
              borderRadius: 2.5,
              padding: 5,
            },
          ]}>
          <AntIcon name={'exception1'} size={15} /> {race.ReputationChange}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const HistoryRow = React.memo(HistoryRowComponent);

export default HistoryRow;
