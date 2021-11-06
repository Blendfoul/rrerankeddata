import React from 'react';
import {RaceResult} from '../../../models/data/Result';
import {Avatar, Caption, Card, IconButton, Paragraph} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import useSectorTimes from '../../../hooks/useSectorTimes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UserRoutes, UserStackList} from '../../../models/navigation/Navigation';

type Props = {
  data: RaceResult;
};

const RaceResultComponent: React.FC<Props> = ({data}) => {
  const {lapTime} = useSectorTimes(data.Laps);
  const navigation =
    useNavigation<NativeStackNavigationProp<UserStackList, 'Result'>>();
  const {t} = useTranslation();

  const navigateToDetails = () => {
    console.warn('Pressed' + data.UserId);
    navigation.navigate({
      name: UserRoutes.DETAILS,
      params: {
        data,
      },
    });
  };

  return (
    <Card style={styles.root}>
      <Card.Title
        title={data.FullName}
        subtitle={data.Team || t('result.privateer')}
        right={props => (
          <IconButton icon={'plus'} onPress={navigateToDetails} {...props} />
        )}
        left={props => (
          <Avatar.Image
            source={{
              uri: `https://game.raceroom.com/game/user_avatar/${data.UserId}`,
            }}
            {...props}
          />
        )}
      />
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>{t('result.position')}</Paragraph>
          <Caption>{data.FinishPositionInClass}</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('result.laptime')}</Paragraph>
          <Caption>{lapTime}</Caption>
        </View>
      </Card.Content>
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Paragraph>{t('result.rating')}</Paragraph>
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
          <Caption>{data.RatingAfter}</Caption>
        </View>
        <View style={styles.container}>
          <View style={styles.content}>
            <Paragraph>{t('result.reputation')}</Paragraph>
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
          <Caption>{data.ReputationAfter}</Caption>
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
  content: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RaceResultComponent;
