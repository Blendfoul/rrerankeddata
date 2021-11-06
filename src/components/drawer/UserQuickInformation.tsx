import React from 'react';
import useRanked from '../../hooks/useRanked';
import {useSelector} from 'react-redux';
import {idSelector} from '../../store/slices/DefaultUser';
import {Avatar, Caption, Card, Paragraph} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

const UserQuickInformation: React.FC = () => {
  const userId = useSelector(idSelector);
  const {rating} = useRanked(userId);
  const {t} = useTranslation();

  if (userId === -1) {
    return null;
  }

  return (
    <>
      <Card.Title
        title={rating?.Fullname}
        subtitle={rating?.Team || 'Privateer'}
        left={props => (
          <Avatar.Image
            source={{
              uri: `https://game.raceroom.com/game/user_avatar/${rating?.UserId}`,
            }}
            {...props}
          />
        )}
      />
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>{t('driver.card.rating')}</Paragraph>
          <Caption>{rating?.Rating}</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('driver.card.reputation')}</Paragraph>
          <Caption>{rating?.Reputation}</Caption>
        </View>
      </Card.Content>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserQuickInformation;
