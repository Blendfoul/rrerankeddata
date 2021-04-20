import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {styles} from '../utils/Theme';
import type {Driver} from '../../interfaces/Driver';
import {useRaceStore} from '../../store/RaceContext';
import {Caption, DataTable, Paragraph} from 'react-native-paper';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Button, Image} from 'react-native-elements';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import {Observer} from 'mobx-react-lite';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoadingActivity from '../utils/LoadingActivity';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const RankingNavigator = ({route, navigation}) => {
  const {translations} = useContext(LocalizationContext);
  const raceStore = useRaceStore();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.navigation.ranking}
        component={RankingScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2f2f2f',
          },
          headerTintColor: '#fff',
          headerLeft: props => (
            <Button
              icon={<MaterialIcons name="menu" size={25} color="white" />}
              title=""
              onPress={() => navigation.toggleDrawer()}
              type={'clear'}
            />
          ),
        }}
      />
      <Stack.Screen
        name={translations.search.title.details}
        component={DriverDetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2f2f2f',
          },
          headerTintColor: '#fff',
          headerRight: props => (
            <Observer>
              {() => (
                <Button
                  icon={<AntDesign name="adduser" size={25} color="white" />}
                  title=""
                  onPress={() => {
                    raceStore.setDefaultDriver(raceStore.SearchDriver);
                    raceStore.setNotification(true);
                  }}
                  style={{marginHorizontal: 10}}
                  type={'clear'}
                />
              )}
            </Observer>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default RankingNavigator;

const itemsPerPage = 50;

const RankingScreen = ({route, navigation}) => {
  const raceStore = useRaceStore();
  const {translations} = useContext(LocalizationContext);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const from1 = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const [data, setData] = useState([]);

  const filterData = useCallback((): Driver[] => {
    const temp = [];
    for (let index = from1; index < to; index++) {
      if (raceStore.Ratings.length === 0) {
        break;
      }

      const driver = raceStore.Ratings[index];

      if (driver !== null) {
        temp.push(driver);
      }
    }
    return temp;
  }, [from1, raceStore.Ratings, to]);

  useEffect(() => {
    setLoading(true);
    setData(filterData());
    setLoading(false);
  }, [filterData]);

  return (
    <DataTable style={[styles.column, {backgroundColor: 'gray'}]}>
      {loading ? (
        <LoadingActivity />
      ) : (
        <ScrollView>
          {data.map((item, index) => (
            <Item
              key={index}
              driver={item}
              index={index}
              page={page}
              navigation={navigation}
              translations={translations}
            />
          ))}
        </ScrollView>
      )}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.floor(raceStore.Ratings.length / itemsPerPage)}
        onPageChange={nPage => setPage(nPage)}
        label={
          <Text style={styles.text}>
            {from1 + 1}-{to} of {raceStore.Ratings.length}
          </Text>
        }
      />
    </DataTable>
  );
};

const RankingItem = ({driver, index, page, navigation, translations}) => {
  return (
    <DataTable.Row
      onPress={() =>
        navigation.navigate(translations.search.title.details, driver.Username)
      }
      style={{paddingVertical: 5}}>
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
      <View style={styles.column}>
        <View style={styles.row}>
          <DataTable.Cell numeric>
            <Paragraph>{driver.RacesCompleted}</Paragraph>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Paragraph>#{index + 1 + itemsPerPage * page}</Paragraph>
          </DataTable.Cell>
        </View>
        <View style={styles.row}>
          <DataTable.Cell numeric>
            <Paragraph>{driver.Reputation}</Paragraph>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Paragraph>{driver.Rating}</Paragraph>
          </DataTable.Cell>
        </View>
      </View>
    </DataTable.Row>
  );
};

const Item = React.memo(RankingItem);
