import React, {useContext} from 'react';
import {Caption, DataTable, Paragraph} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import type {Driver} from '../../interfaces/Driver';
import {LocalizationContext} from '../translations/LocalizationContext';
import {styles} from '../utils/Theme';
import {Image} from 'react-native-elements';
import {useRaceStore} from '../../store/RaceContext';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Flag from 'react-native-flags';

const DriverRow = ({onPress, driver}) => {
  const {translations} = useContext(LocalizationContext);
  const raceStore = useRaceStore();

  return (
    <DataTable.Row
      onPress={onPress}
      style={{
        paddingVertical: 5,
        backgroundColor:
          raceStore.DefaultDriver === driver.Username ? 'darkgray' : 'gray',
      }}>
      <View
        style={[
          styles.column,
          styles.alignCenter,
          styles.justifyCenter,
          {flex: 0, paddingRight: 10},
        ]}>
        <Image
          style={{width: 40, height: 40, borderRadius: 5}}
          source={{
            uri: 'https://game.raceroom.com/game/user_avatar/' + driver.UserId,
          }}
        />
      </View>
      <View style={styles.column}>
        <Paragraph>{driver.Fullname}</Paragraph>
        <View style={[styles.row, styles.alignCenter]}>
          <Flag size={24} code={driver.Country} type={'flat'} />
          <Caption style={{paddingLeft: 5}}>
            {driver.Team || translations.profile.privateer}
          </Caption>
        </View>
      </View>
      <View
        style={[
          styles.column,
          styles.alignCenter,
          styles.justifyCenter,
          {
            flex: 0.5,
            justifyContent: 'flex-start',
          },
        ]}>
        <View style={[styles.row, styles.alignCenter, {width: '100%'}]}>
          <AntIcon size={15} name={'solution1'} color={'#fff'} />
          <Paragraph style={[styles.paddingHorizontal5]}>
            {driver.Rating}
          </Paragraph>
        </View>
        <View style={[styles.row, styles.alignCenter, {width: '100%'}]}>
          <AntIcon size={15} name={'exception1'} color={'#fff'} />
          <Paragraph style={styles.paddingHorizontal5}>
            {driver.Reputation}
          </Paragraph>
        </View>
      </View>
    </DataTable.Row>
  );
};

const DriverList = props => {
  const {translations} = useContext(LocalizationContext);
  const raceStore = useRaceStore();

  const onDriverPress = (userId: Number) => {
    props.navigation.navigate(translations.navigation.driverDetails, userId);
  };

  return (
    <DataTable style={componentStyle.container}>
      <ScrollView>
        {props.drivers.map((driver: Driver, index: Number) => (
          <DriverRow
            key={index}
            onPress={() => {
              raceStore.setSearchDriver(driver.Username);
              onDriverPress(driver.Username);
            }}
            driver={driver}
          />
        ))}
      </ScrollView>
    </DataTable>
  );
};

const componentStyle = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
  },
  image: {
    flex: 1,
    width: 25,
    height: 25,
  },
});

export default DriverList;
