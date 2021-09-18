import React, {useCallback} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import CarClass from '../utils/CarClass';
import AntDesign from 'react-native-vector-icons/AntDesign';
//@ts-ignore component sem types
import CountDown from 'react-native-countdown-component';
import {useNavigation} from '@react-navigation/core';
import {Caption, Card, useTheme} from 'react-native-paper';
import useRaceSession from '../../hooks/useRaceSession';
import useRaceType from '../../hooks/useRaceType';
import TrackImage from '../utils/TrackImage';
import {User} from '../../hooks/useDrawerContent';
import {ServerData} from '../../types/server';
import {RaceStackList} from '../../types/NavigatorProps';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface RaceProps {
  data: ServerData;
  driver: User | null;
}

type Props = NativeStackNavigationProp<RaceStackList, 'race'>;

const RaceComponent: React.FC<RaceProps> = ({data, driver}) => {
  //@ts-ignore
  const navigation = useNavigation<Props['route']>();
  const {name, raceType} = useRaceType(data.Settings);
  const {session} = useRaceSession(data.CurrentSession);
  const {colors} = useTheme();

  const onRacePress = useCallback(() => {
    navigation.navigate({
      name: 'raceDetails',
      params: {
        data: data.Settings.ServerName,
      },
    });
  }, [data.Settings.ServerName, navigation]);

  const color =
    driver !== null
      ? data.Settings.MinReputation > driver.reputation ||
        data.Settings.MinRating > driver.rating
        ? colors.error
        : data.Players.includes(driver.id)
        ? 'gray'
        : colors.background
      : colors.background;

  const style = StyleSheet.create({
    root: {
      backgroundColor: color,
      margin: 5,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    classContent: {
      justifyContent: 'center',
      flex: 1,
      marginTop: 5,
    },
    label: {
      backgroundColor: raceType.color || colors.backdrop,
      height: 10,
    },
    image: {
      width: 55,
      height: 'auto',
      marginRight: 12,
    },
    session: {
      flex: 1.5,
      justifyContent: 'center',
      height: 20,
      alignItems: 'center',
      textAlign: 'center',
    },
    rest: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
  });

  return (
    <Card style={style.root} onPress={onRacePress} elevation={3}>
      <TrackImage layoutId={data.Settings.TrackLayoutId[0]} size={55} />
      <View style={style.label} />
      <Card.Title
        title={name}
        right={() => (
          <Image
            source={raceType.image}
            style={style.image}
            resizeMode={'contain'}
            height={25}
          />
        )}
      />
      <Card.Content style={style.content}>
        <Caption style={style.rest}>
          <AntDesign name={'car'} size={15} /> {data.PlayersOnServer}
        </Caption>
        <Caption style={style.session}>
          <AntDesign name={'clockcircleo'} size={15} /> {session}
        </Caption>
        <View style={style.rest}>
          <CountDown
            until={data.TimeLeft}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{m: null, s: null}}
            size={10}
            onChange={(value: number) => (data.TimeLeft = value)}
          />
        </View>
      </Card.Content>
      <Card.Content style={style.classContent}>
        <CarClass
          liveries={data.Settings.LiveryId}
          size={25}
          imgSize={'small'}
        />
      </Card.Content>
    </Card>
  );
};

export default RaceComponent;
