import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRaceStore} from './RaceContext';
import DriverList from './DriverList';
import axios from 'axios';

const RankedDetails = props => {
  const raceStore = useRaceStore();
  const drivers = props.data.Players;
  const [details, setDetails] = useState({drivers: [], sof: 0, rep: 0});

  useEffect(() => {
    const data = {
      drivers: [],
      sof: 0,
      rep: 0,
    };

    const promise = new Promise(async resolve => {
      for (const driver of drivers) {
        const newData = raceStore.Ratings.find(
          value => value.UserId === driver,
        );
        if (newData !== undefined) {
          data.drivers.push(newData);
        } else {
          const user = await axios(
            'https://game.raceroom.com/utils/user-info/' + driver,
          );
          data.drivers.push({
            Fullname: user.data.name,
            Username: user.data.username,
            Rating: 1700,
            Reputation: 70,
          });
        }
      }
      resolve(data);
    });

    promise.then(driverData => {
      if (driverData.drivers.length > 0) {
        driverData.drivers.forEach(driver => {
          if (driver !== undefined) {
            data.sof += driver.Rating;
            data.rep += driver.Reputation;
          }
        });

        data.sof /= data.drivers.length;
        data.rep /= data.drivers.length;

        data.drivers.sort((a, b) => b.Rating - a.Rating);
      }

      setDetails(data);
    });
  }, [drivers, raceStore.Ratings]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>Players</Text>
        <Text style={styles.heading}>S.o.F.</Text>
        <Text style={styles.heading}>Reputation</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{props.data.PlayersOnServer}</Text>
        <Text style={styles.text}>{details.sof.toFixed(3)}</Text>
        <Text style={styles.text}>{details.rep.toFixed(3)}</Text>
      </View>
      <View style={styles.container}>
        <DriverList drivers={details.drivers} navigation={props.navigation} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
  },
});

export default RankedDetails;
