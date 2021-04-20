import React, {useCallback, useContext, useState} from 'react';
import {Caption, Paragraph} from 'react-native-paper';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {LocalizationContext} from '../translations/LocalizationContext';
import {styles} from '../utils/Theme';
import {Image} from 'react-native-elements';
import {useRaceStore} from '../../store/RaceContext';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Flag from 'react-native-flags';
import axios from 'axios';
import TextContainer from '../utils/TextContainer';

const DriverRow = ({driver, navigation}) => {
  const {translations} = useContext(LocalizationContext);
  const raceStore = useRaceStore();

  const driverPress = () => {
    raceStore.setSearchDriver(driver.Username);
    navigation.navigate(translations.navigation.driverDetails, driver.Username);
  };

  const rowStyle = StyleSheet.create({
    opacity: {
      paddingVertical: 5,
      flex: 1,
      flexDirection: 'row',
      backgroundColor:
        raceStore.DefaultDriver === driver.Username ? 'darkgray' : 'gray',
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
    container: {
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
      <View style={rowStyle.container}>
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
          <AntIcon size={15} name={'solution1'} color={'#fff'} />
          <Paragraph style={styles.paddingHorizontal5}>
            {driver.Rating}
          </Paragraph>
        </View>
        <View style={rowStyle.data}>
          <AntIcon size={15} name={'exception1'} color={'#fff'} />
          <Paragraph style={styles.paddingHorizontal5}>
            {driver.Reputation}
          </Paragraph>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DriverList = ({drivers, navigation}) => {
  const [refresh, setRefresh] = useState(false);
  const raceStore = useRaceStore();
  const {translations} = useContext(LocalizationContext);

  const refreshControl = useCallback(async () => {
    const source = axios.CancelToken.source();

    try {
      setRefresh(true);

      const response = await axios('multiplayer-rating/servers/', {
        token: source.token,
      });

      raceStore.setRaces(response.data.result);

      setRefresh(false);
    } catch (e) {
      console.error(e);
    }

    return () => source.cancel();
  }, [raceStore]);

  return drivers.length === 0 ? (
    <View style={[styles.loadingContainer]}>
      <TextContainer
        title={<AntIcon name={'car'} color={'#fff'} size={100} />}
        text={translations.noDrivers}
      />
    </View>
  ) : (
    <FlatList
      style={componentStyle.container}
      data={drivers}
      renderItem={({item, index}) => (
        <DriverRow driver={item} navigation={navigation} key={index} />
      )}
      keyExtractor={({item, index}) => index}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={refreshControl} />
      }
      refreshing={refresh}
    />
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
