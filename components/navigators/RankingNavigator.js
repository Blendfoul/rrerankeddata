import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {styles} from '../utils/Theme';
import type {Driver} from '../../interfaces/Driver';
import FastImage from 'react-native-fast-image';
import {useRaceStore} from '../../store/RaceContext';
import {DataTable} from 'react-native-paper';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {LocalizationContext} from '../translations/LocalizationContext';

const Stack = createStackNavigator();

const RankingNavigator = ({route, navigation}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={translations.navigation.ranking}
        component={RankingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RankingNavigator;

const itemsPerPage = 50;

const RankingScreen = () => {
  const raceStore = useRaceStore();

  const [page, setPage] = React.useState(0);
  const from1 = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const data = (): Driver[] => {
    const temp = [];
    for (let index = from1; index < to; index++) {
      temp.push(raceStore.Ratings[index]);
    }

    return temp;
  };

  return (
    <ScrollView>
      <DataTable style={[styles.backgroundColor]}>
        <DataTable.Header>
          <DataTable.Title style={[{flex: 0.5}]} />
          <DataTable.Title numeric>
            <AntIcon name={'exception1'} color={'#fff'} size={25} />
          </DataTable.Title>
          <DataTable.Title numeric>
            <AntIcon name={'solution1'} color={'#fff'} size={25} />
          </DataTable.Title>
          <DataTable.Title numeric>
            <AntIcon name={'car'} color={'#fff'} size={25} />
          </DataTable.Title>
        </DataTable.Header>

        {data().map((item, index) => (
          <Item key={index} data={item} index={index} page={page} />
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.floor(raceStore.Ratings.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={
            <Text style={styles.text}>
              {from1 + 1}-{to} of {raceStore.Ratings.length}
            </Text>
          }
        />
      </DataTable>
    </ScrollView>
  );
};

const RankingItem = ({data, index, page}) => {
  return (
    <DataTable.Row style={[componentStyle.row, {height: 65}]}>
      <DataTable.Cell style={{flex: 1}}>
        <FastImage
          style={{width: 40, height: 40}}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: 'http://game.raceroom.com/game/user_avatar/' + data.UserId,
            priority: FastImage.priority.normal,
          }}
        />
      </DataTable.Cell>
      <View style={[styles.column, {flex: 6}]}>
        <View style={styles.row}>
          <Text style={[styles.row, styles.text, {flex: 2}]}>
            {data.Fullname}
          </Text>
          <Text style={[styles.row, componentStyle.position, styles.text]}>
            #{index + 1 + itemsPerPage * page}
          </Text>
        </View>
        <View style={styles.row}>
          <DataTable.Cell numeric>
            <Text style={styles.text}>{data.Reputation}</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.text}>{data.Rating}</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.text}>{data.RacesCompleted}</Text>
          </DataTable.Cell>
        </View>
      </View>
    </DataTable.Row>
  );
};

const Item = React.memo(RankingItem);

const componentStyle = StyleSheet.create({
  row: {
    paddingVertical: 5,
  },
  position: {
    textAlign: 'right',
  },
});
