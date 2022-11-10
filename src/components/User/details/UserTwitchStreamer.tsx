import React from 'react';
import { User } from '../../../models/data/User';
import useStreamData from '../../../hooks/useStreamData';
import { Card } from 'react-native-paper';
import { Linking, StyleSheet } from 'react-native';
import CustomCardCover from '../../shared/CustomCardCover';

type Props = {
  user: User;
};

const UserTwitchStreamer: React.FC<Props> = ({ user }) => {
  const handleArray = user?.team?.split('/') || [''];
  const handle = handleArray[handleArray.length - 1].trim();
  const { data } = useStreamData(handle);

  if (!data) {
    return null;
  }

  const linkToStreamer = () => {
    Linking.openURL(`https://twitch.tv/${data.broadcaster_login}`);
  };

  return (
    <Card style={styles.root} onPress={linkToStreamer}>
      <CustomCardCover
        source={{ uri: data.thumbnail_url }}
        resizeMode={'cover'}
      />
      <Card.Title
        title={data.title}
        titleStyle={styles.title}
        subtitle={data.is_live ? 'Live on twitch' : 'offline'}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 5,
    elevation: 3,
  },
  img: {
    width: 150,
    height: '100%',
  },
  title: {
    fontSize: 15,
  },
});

export default UserTwitchStreamer;
