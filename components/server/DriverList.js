import React, {useContext} from 'react';
import {Caption, DataTable, Paragraph} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import type {Driver} from '../../interfaces/Driver';
import {LocalizationContext} from '../translations/LocalizationContext';
import {styles} from '../utils/Theme';
import {Image} from 'react-native-elements';

const DriverRow = ({onPress, driver}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <DataTable.Row onPress={onPress} style={{paddingVertical: 5}}>
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
        <Caption>{driver.Team || translations.profile.privateer}</Caption>
      </View>
      <View style={styles.row}>
        <DataTable.Cell numeric>
          <Paragraph>{driver.Reputation}</Paragraph>
        </DataTable.Cell>
        <DataTable.Cell numeric>
          <Paragraph>{driver.Rating}</Paragraph>
        </DataTable.Cell>
      </View>
    </DataTable.Row>
  );
};

const DriverList = props => {
  const {translations} = useContext(LocalizationContext);
  const onDriverPress = async (userId: Number) => {
    props.navigation.navigate(translations.navigation.driverDetails, userId);
  };
  return (
    <DataTable style={componentStyle.container}>
      <ScrollView>
        {props.drivers.map((driver: Driver, index: Number) => (
          <DriverRow
            key={index}
            onPress={() => onDriverPress(driver.Username)}
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
