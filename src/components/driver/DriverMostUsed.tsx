import React from 'react';
import {DriverProps} from './DriverHeader';
import {Card, useTheme} from 'react-native-paper';
import {Image, StyleSheet} from 'react-native';
import Logo from '../../assets/logos/Logo';

const renderLogo: React.FC<any> = (track, index) => {
  const data = track.image.full
    .split('')
    .filter((char: string) => /[0-9]/.test(char));

  data.shift();

  return (
    <Image
      key={index}
      style={{width: 75, height: 75, backgroundColor: 'white'}}
      source={Logo(+data.join(''))}
    />
  );
};

const DriverMostUsed: React.FC<DriverProps> = ({item}) => {
  const {colors} = useTheme();
  const style = StyleSheet.create({
    root: {
      backgroundColor: colors.primary,
      margin: 5,
    },
    image: {
      backgroundColor: colors.primary,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  });

  return (
    <Card style={style.root} elevation={3}>
      <Card.Cover
        resizeMethod={'scale'}
        resizeMode={'contain'}
        source={{uri: item.data?.overview.most_used_cars[0]?.image?.scaled}}
        style={style.image}
      />
      <Card.Content style={style.content}>
        {item.data.overview.most_used_tracks.map(renderLogo)}
      </Card.Content>
    </Card>
  );
};

export default DriverMostUsed;
