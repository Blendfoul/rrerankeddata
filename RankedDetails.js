import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRaceStore} from './store/RaceContext';
import DriverList from './DriverList';
import axios from 'axios';
import {styles} from './Theme';
import TextContainer from './TextContainer';

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
      <View
        style={[
          styles.row,
          styles.alignStart,
          styles.justifyEvenly,
          styles.paddingVertical5,
        ]}>
        <TextContainer title={'Players'} text={props.data.PlayersOnServer} />
        <TextContainer title={'S.o.F.'} text={details.sof.toFixed(3)} />
        <TextContainer title={'Reputation'} text={details.rep.toFixed(3)} />
      </View>
      <View style={styles.container}>
        <DriverList
          drivers={details.drivers}
          navigation={props.navigation}
          loading={props.loading}
        />
      </View>
    </>
  );
};

export default RankedDetails;
