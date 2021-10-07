import React from 'react';
import {Avatar, Caption, Card} from 'react-native-paper';
import {StyleSheet} from 'react-native';
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
        subtitle={driver?.Team}
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
        <Caption>{driver.Rating}</Caption>
        <Caption>{driver.Reputation}</Caption>
        <Caption>{driver.RacesCompleted}</Caption>
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
});

export default DriverCard;
