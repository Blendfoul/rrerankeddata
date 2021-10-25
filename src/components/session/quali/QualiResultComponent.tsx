import React from 'react';
import {QualiResult} from '../../../models/data/Result';
import {Avatar, Caption, Card, Paragraph} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import useSectorTimes from '../../../hooks/useSectorTimes';

type Props = {
  data: QualiResult;
};

const QualiResultComponent: React.FC<Props> = ({data}) => {
  const {sectors, lapTime} = useSectorTimes(data.Laps);
  return (
    <Card style={styles.root}>
      <Card.Title
        title={data.FullName}
        subtitle={data.Team || 'Privateer'}
        left={props => (
          <Avatar.Image
            source={{
              uri: `https://game.raceroom.com/game/user_avatar/${data.UserId}`,
            }}
            {...props}
          />
        )}
      />
      <Card.Content style={styles.container}>
        <View style={styles.content}>
          <Paragraph>Position</Paragraph>
          <Caption>{data.FinishPositionInClass}</Caption>
        </View>
        <View style={styles.content}>
          <Paragraph>Lap time</Paragraph>
          <Caption>{lapTime}</Caption>
        </View>
      </Card.Content>
      <Card.Content style={styles.container}>
        <View style={styles.content}>
          <Paragraph>Sector 1</Paragraph>
          <Caption>{sectors[0] / 1000}s</Caption>
        </View>
        <View style={styles.content}>
          <Paragraph>Sector 2</Paragraph>
          <Caption>{(sectors[1] - sectors[0]) / 1000}s</Caption>
        </View>
        <View style={styles.content}>
          <Paragraph>Sector 3</Paragraph>
          <Caption>{(sectors[2] - sectors[1]) / 1000}s</Caption>
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
  container: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QualiResultComponent;
