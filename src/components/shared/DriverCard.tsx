import React from 'react';
import {Avatar, Caption, Card, Paragraph, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ServerRoutes,
  ServerStackList,
} from '../../models/navigation/Navigation';
import {Rating} from '../../models/data/Ranked';
import Country from './Country';
import {useTranslation} from 'react-i18next';
import useStreamData from '../../hooks/useStreamData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  driver: Rating;
};

type NavigationProps = NativeStackNavigationProp<ServerStackList, 'Server'>;

const DriverCard: React.FC<Props> = ({driver}) => {
  const navigation = useNavigation<NavigationProps>();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const handleArray = driver.Team.split('/');
  const handle = handleArray[handleArray.length - 1].trim();
  const {data} = useStreamData(handle);

  const navigateToDriver = () => {
    navigation.navigate({
      name: ServerRoutes.USER,
      params: {
        id: driver.UserId,
      },
    });
  };

  return (
    <Card style={styles.root} onPress={navigateToDriver}>
      <Card.Title
        title={driver.Fullname}
        subtitle={driver?.Team || t('driver.card.privateer')}
        left={props => (
          <Avatar.Image
            source={{
              uri: `https://game.raceroom.com/game/user_avatar/${driver.UserId}`,
            }}
            {...props}
          />
        )}
        right={props => (
          <View style={{flexDirection: 'row'}}>
            {data ? (
              <Icon
                name={'twitch'}
                color={data?.is_live ? '#AA70FF' : colors.text}
                {...props}
              />
            ) : null}
            <View style={{paddingHorizontal: 5}} />
            <Country country={driver.Country} {...props} />
          </View>
        )}
      />
      <Card.Content style={styles.container}>
        <View style={styles.content}>
          <Paragraph>{t('driver.card.rating')}</Paragraph>
          <Caption>{driver.Rating}</Caption>
        </View>
        <View style={styles.content}>
          <Paragraph>{t('driver.card.reputation')}</Paragraph>
          <Caption>{driver.Reputation}</Caption>
        </View>
        <View style={styles.content}>
          <Paragraph>{t('driver.card.races')}</Paragraph>
          <Caption>{driver.RacesCompleted}</Caption>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DriverCard;
