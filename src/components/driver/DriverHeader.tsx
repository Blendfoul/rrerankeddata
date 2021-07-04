import React from 'react';
import {Driver} from '../../hooks/useDriver';
import {Avatar, Card, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
//@ts-ignore
import Flag from 'react-native-flags';

export interface DriverProps {
  item: Driver;
}

const DriverHeader: React.FC<DriverProps> = ({item}) => {
  const {colors} = useTheme();
  const style = StyleSheet.create({
    root: {
      backgroundColor: colors.primary,
      margin: 5,
    },
    image: {
      height: 125,
      backgroundColor: colors.primary,
    },
    flag: {
      paddingHorizontal: 10,
    },
  });

  return (
    <Card style={style.root} elevation={3}>
      <Card.Cover
        source={
          item.data.header
            ? {uri: item.data.header}
            : require('../../assets/r3e.png')
        }
        resizeMode={'contain'}
        resizeMethod={'resize'}
        style={style.image}
      />
      <Card.Title
        title={item.data.name}
        subtitle={item.data.team}
        left={props => (
          <Avatar.Image {...props} source={{uri: item.data.avatar}} />
        )}
        right={props => (
          <View {...props} style={style.flag}>
            <Flag
              code={item.data.overview.country.code.toUpperCase()}
              size={24}
            />
          </View>
        )}
      />
    </Card>
  );
};

export default DriverHeader;
