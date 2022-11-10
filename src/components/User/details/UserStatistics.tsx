import React from 'react';
import { Caption, Card, Paragraph } from 'react-native-paper';
import { User } from '../../../models/data/User';
import useRanked from '../../../hooks/useRanked';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ratingPositionSelector } from '../../../store/slices/Ratings';

type Props = {
  user: User;
};

const UserStatistics: React.FC<Props> = ({ user }) => {
  const { rating } = useRanked(user.id);
  const position = useSelector(ratingPositionSelector(user.id));
  const { t } = useTranslation();

  return (
    <Card style={styles.root}>
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>{t('driver.card.position')}</Paragraph>
          <Caption>{position || 0}</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('driver.card.rating')}</Paragraph>
          <Caption>{rating?.Rating}</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('driver.card.reputation')}</Paragraph>
          <Caption>{rating?.Reputation}</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('driver.card.races')}</Paragraph>
          <Caption>{rating?.RacesCompleted}</Caption>
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
