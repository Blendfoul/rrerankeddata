import React, {useCallback, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import CarClass from '../utils/CarClass';
import AntDesign from 'react-native-vector-icons/AntDesign';
//@ts-ignore component sem types
import CountDown from 'react-native-countdown-component';
import {LocalizationContext} from '../translations/LocalizationContext';
import {ServerData} from '../../types/Server';
import {useNavigation} from '@react-navigation/core';
import {Caption, Card, Subheading, useTheme} from 'react-native-paper';
import useRaceSession from '../../hooks/useRaceSession';
import {User} from '../../hooks/useDrawerContent';
import useRaceType from '../../hooks/useRaceType';
import TrackImage from '../utils/TrackImage';

interface RaceProps {
  data: ServerData;
  driver: User | null;
}

const RaceComponent: React.FC<RaceProps> = ({data, driver}) => {
  const {translations} = useContext(LocalizationContext);
  const navigation = useNavigation();
  const {name, raceType} = useRaceType(data.Settings);
  const {session} = useRaceSession(data.CurrentSession);
  const {colors} = useTheme();

  const onRacePress = useCallback(() => {
    navigation.navigate({
      name: translations.navigation.raceDetails,
      params: {
        data: data.Settings.ServerName,
      },
    });
  }, [
    data.Settings.ServerName,
    navigation,
    translations.navigation.raceDetails,
  ]);

  const color =
    driver !== null
      ? data.Settings.MinReputation > driver.reputation ||
        data.Settings.MinRating > driver.rating
        ? colors.error
        : data.Players.includes(driver.id)
        ? colors.accent
        : colors.primary
      : colors.primary;

  const style = StyleSheet.create({
    root: {
      backgroundColor: color,
      margin: 5,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 5,
    },
    label: {
      backgroundColor: raceType.color || colors.primary,
      height: 10,
    },
  });

  return (
    <Card style={style.root} onPress={onRacePress} elevation={3}>
      <TrackImage trackId={data.Settings.TrackLayoutId[0]} size={55} />
      <View style={style.label} />
      <Card.Content style={style.content}>
        <CarClass
          liveries={data.Settings.LiveryId}
          size={25}
          imgSize={'small'}
        />
        <Subheading>{name}</Subheading>
      </Card.Content>
      <Card.Content style={style.content}>
        <Caption>
          <AntDesign name={'car'} size={15} /> {data.PlayersOnServer}
        </Caption>
        <Caption>
          <AntDesign name={'clockcircleo'} size={15} /> {session}
        </Caption>
        <CountDown
          until={data.TimeLeft / 1000}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{m: null, s: null}}
          size={10}
        />
      </Card.Content>
    </Card>
  );
};

export default RaceComponent;
