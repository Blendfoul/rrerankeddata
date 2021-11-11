import React from 'react';
import {Card} from 'react-native-paper';
import CustomCardCover from '../../shared/CustomCardCover';
import Country from '../../shared/Country';
import {User} from '../../../models/data/User';
import {Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  user: User;
};

const UserInformation: React.FC<Props> = ({user}) => {
  const {t} = useTranslation();

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
        <Image source={{uri: user.avatar}} style={styles.hero} />
      </CustomCardCover>
      <Card.Title
        title={user.name}
        subtitle={user.team || t('driver.card.privateer')}
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
  hero: {
    width: 100,
    height: 100,
  },
});

export default UserInformation;
