import React from 'react';
import {MostUsed, User} from '../../../models/data/User';
import {Card} from 'react-native-paper';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import ContentImage from '../../shared/ContentImage';
import FastImage from 'react-native-fast-image';

type Props = {
  user: User;
};

const UserMostUsed: React.FC<Props> = ({user}) => {
  const renderItem: ListRenderItem<MostUsed> = ({item}) => {
    const data = item.image.full
      .split('')
      .filter((char: string) => /[0-9]/.test(char));

    data.shift();

    console.log(item);

    return (
      <ContentImage
        source={{
          uri: `https://prod.r3eassets.com/assets/content/track/${item.name
            .toLowerCase()
            .replaceAll(' ', '-')
            .replace('ü', 'u')}-${data}-logo-original.webp`,
        }}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.img}
      />
    );
  };

  return (
    <Card style={styles.root}>
      <Card.Content>
        <ContentImage
          source={{
            uri: user.most_used_cars[0]?.image?.full,
          }}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.carImg}
        />
        <FlatList
          horizontal
          data={user.most_used_tracks}
          renderItem={renderItem}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 5,
    elevation: 3,
  },
  img: {
    width: 100,
    height: 100,
  },
  carImg: {
    width: 360,
    height: 180,
  },
});

export default UserMostUsed;
