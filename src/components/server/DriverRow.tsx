import React, {useContext} from 'react';
import {LocalizationContext} from '../translations/LocalizationContext';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {styles} from '../utils/Theme';
import {Caption, Paragraph} from 'react-native-paper';
//@ts-ignore sem types
import Flag from 'react-native-flags';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Rating} from '../../types/rating';
import {useRaceContext} from '../../store/RaceContext';
import {useNavigation} from '@react-navigation/core';

interface DriverRowProps {
  driver: Rating;
}

const DriverRow: React.FC<DriverRowProps> = ({driver}) => {
  const {translations} = useContext(LocalizationContext);
  const [state] = useRaceContext();
  const navigation = useNavigation();

  const driverPress = () => {
    console.log('update');

    navigation.navigate({
      name: translations.navigation.driverDetails,
      params: {username: driver.Username},
    });
  };

  const rowStyle = StyleSheet.create({
    opacity: {
      paddingVertical: 5,
      flex: 1,
      flexDirection: 'row',
      backgroundColor:
        state.defaultDriver === driver.Username ? 'darkgray' : 'gray',
      borderBottomWidth: 0.5,
      borderBottomColor: 'white',
      borderTopWidth: 0.5,
      borderTopColor: 'white',
    },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 5,
    },
    root: {
      flex: 0,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginHorizontal: 5,
    },
    data: {width: '100%', alignItems: 'center', flexDirection: 'row', flex: 1},
    dataContainer: {
      flex: 0.75,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    paddingLeft: {
      paddingLeft: 5,
      width: '100%',
    },
  });

  return (
    <TouchableOpacity onPress={driverPress} style={rowStyle.opacity}>
      <View style={rowStyle.root}>
        <Image
          style={rowStyle.logo}
          source={{
            uri: 'https://game.raceroom.com/game/user_avatar/' + driver.UserId,
            cache: 'only-if-cached',
          }}
        />
      </View>
      <View style={[styles.column, {flex: 2}]}>
        <Paragraph>{driver.Fullname}</Paragraph>
        <View style={rowStyle.data}>
          <Flag size={24} code={driver.Country} type={'flat'} />
          <Caption style={rowStyle.paddingLeft}>
            {driver.Team || translations.profile.privateer}
          </Caption>
        </View>
      </View>
      <View style={rowStyle.dataContainer}>
        <View style={rowStyle.data}>
          <AntIcon size={15} name={'solution1'} />
          <Paragraph style={styles.paddingHorizontal5}>
            {driver.Rating}
          </Paragraph>
        </View>
        <View style={rowStyle.data}>
          <AntIcon size={15} name={'exception1'} />
          <Paragraph style={styles.paddingHorizontal5}>
            {driver.Reputation}
          </Paragraph>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DriverRow;
