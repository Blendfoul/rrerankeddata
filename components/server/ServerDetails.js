import React, {useContext, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {useRaceStore} from '../../store/RaceContext';
import DriverList from './DriverList';
import axios from 'axios';
import {styles} from '../utils/Theme';
import {TabBar, TabView} from 'react-native-tab-view';
import RaceDetailsData from './ServerDetailsData';
import {LocalizationContext} from '../translations/LocalizationContext';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.backgroundColor}
    style={{backgroundColor: 'gray'}}
  />
);

const ServerDetails = ({data, navigation, loading, session}) => {
  const raceStore = useRaceStore();
  const {translations} = useContext(LocalizationContext);

  const drivers = data.Players;
  const [details, setDetails] = useState({drivers: [], sof: 0, rep: 0});
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'data', title: translations.raceDetails.general},
    {key: 'drivers', title: translations.raceDetails.drivers},
  ]);

  useEffect(() => {
    const data = {
      drivers: [],
      sof: 0,
      rep: 0,
    };

    const promise = new Promise(async resolve => {
      const source = axios.CancelToken.source();

      for (const driver of drivers) {
        const newData = raceStore.Ratings.find(
          value => value.UserId === driver,
        );
        if (newData !== undefined) {
          data.drivers.push(newData);
        } else {
          const user = await axios('/utils/user-info/' + driver, {
            cancelToken: source.token,
          });
          data.drivers.push({
            Fullname: user.data.name,
            Username: user.data.username,
            Rating: 1700,
            Reputation: 70,
          });
        }
      }
      resolve(data);
      return () => source.cancel();
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

  const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'data':
        return (
          <RaceDetailsData data={data} details={details} session={session} />
        );
      case 'drivers':
        return (
          <DriverList
            drivers={details.drivers}
            navigation={navigation}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TabView
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      renderScene={renderScene}
      navigationState={{index, routes}}
      initialLayout={initialLayout}
    />
  );
};

export default ServerDetails;
