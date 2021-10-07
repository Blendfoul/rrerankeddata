import React from 'react';
import {Avatar, Card} from 'react-native-paper';
import CustomCardCover from '../../shared/CustomCardCover';
import Country from '../../shared/Country';
import {User} from '../../../models/data/User';
import {StyleSheet} from 'react-native';

type Props = {
  user: User;
};

const UserInformation: React.FC<Props> = ({user}) => {
  return (
    <Card style={styles.root}>
      <CustomCardCover
        resizeMode={'stretch'}
        style={styles.img}
        source={{
          uri:
            user.header ||
            'https://prod.r3eassets.com/static/img/banners/r3e.jpg',
        }}>
        <Avatar.Image source={{uri: user.avatar}} size={100} />
      </CustomCardCover>
      <Card.Title
        title={user.name}
        subtitle={user.team}
        right={props => <Country country={user.country.code} {...props} />}
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
    height: 125,
  },
});

export default UserInformation;
