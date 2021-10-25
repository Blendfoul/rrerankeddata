import React from 'react';
import {Avatar, Caption, Card, Paragraph} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ServerRoutes,
  ServerStackList,
} from '../../models/navigation/Navigation';
import {Rating} from '../../models/data/Ranked';
import Country from './Country';

type Props = {
  driver: Rating;
};

type NavigationProps = NativeStackNavigationProp<ServerStackList, 'Server'>;

const DriverCard: React.FC<Props> = ({driver}) => {
  const navigation = useNavigation<NavigationProps>();

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
        subtitle={driver?.Team || 'Privateer'}
        left={props => (
          <Avatar.Image
            source={{
              uri: `https://game.raceroom.com/game/user_avatar/${driver.UserId}`,
            }}
            {...props}
          />
        )}
        right={props => <Country country={driver.Country} {...props} />}
      />
      <Card.Content style={styles.container}>
        <View style={styles.content}>
          <Paragraph>Rating</Paragraph>
          <Caption>{driver.Rating}</Caption>
        </View>
        <View style={styles.content}>
          <Paragraph>Reputation</Paragraph>
          <Caption>{driver.Reputation}</Caption>
        </View>
        <View style={styles.content}>
          <Paragraph>Races</Paragraph>
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