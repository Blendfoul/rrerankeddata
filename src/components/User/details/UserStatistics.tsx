import React from 'react';
import {Caption, Card, Paragraph} from 'react-native-paper';
import {User} from '../../../models/data/User';
import useRanked from '../../../hooks/useRanked';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  user: User;
};

const UserStatistics: React.FC<Props> = ({user}) => {
  const {rating} = useRanked(user.user_id);
  const {t} = useTranslation();

  return (
    <Card style={styles.root}>
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>{t('profile.rating')}</Paragraph>
          <Caption>{rating?.Rating}</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('profile.reputation')}</Paragraph>
          <Caption>{rating?.Reputation}</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('profile.races')}</Paragraph>
          <Caption>{rating?.RacesCompleted}</Caption>
        </View>
      </Card.Content>
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>{user.basic_statistics[0].label}</Paragraph>
          <Caption>{user.basic_statistics[0].value}</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{user.basic_statistics[1].label}</Paragraph>
          <Caption>{user.basic_statistics[1].value}</Caption>
        </View>
      </Card.Content>
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>{user.basic_statistics[2].label}</Paragraph>
          <Caption>{user.basic_statistics[2].value}</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{user.basic_statistics[3].label}</Paragraph>
          <Caption>{user.basic_statistics[3].value}</Caption>
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

export default UserStatistics;
