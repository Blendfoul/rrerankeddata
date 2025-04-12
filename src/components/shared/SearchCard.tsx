import React from 'react';

import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import { SearchUser, User } from '../../models/data/User';
import { UserRoutes, UserStackList } from '../../models/navigation/Navigation';

type Props = {
  item: SearchUser;
};

const SearchCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<NativeStackNavigationProp<UserStackList>>();

  const selectUser = async () => {
    const response = await fetch(
      `https://game.raceroom.com/utils/user-info/${item.meta_data.slug}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = (await response.json()) as User;

    navigation.navigate({
      name: UserRoutes.USER,
      params: {
        id: data.id,
      },
    });
  };

  return (
    <Card style={styles.root} onPress={selectUser}>
      <Card.Content style={styles.heroContainer}>
        <Image source={{ uri: item.image }} style={styles.hero} />
      </Card.Content>
      <Card.Title title={item.name} titleStyle={styles.heroName} subtitle={item.meta_data.slug} />
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 5,
    elevation: 3,
  },
  hero: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  heroContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroName: {
    fontSize: 15,
  },
});

export default SearchCard;
