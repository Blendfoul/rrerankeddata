import React, {useState} from 'react';
import {Caption, DataTable, Paragraph} from 'react-native-paper';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RaceModal from './RaceModal';
import {styles} from '../utils/Theme';
import {Image} from 'react-native-elements';
import Race from '../race/Race';
import {useRaceStore} from '../../store/RaceContext';
import AntIcon from 'react-native-vector-icons/AntDesign';

const componentStyle = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  flex_2: {
    flex: 2,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  imageCar: {
    width: 62.5,
    height: 50,
  },
  gray: {
    backgroundColor: 'gray',
  },
});

const RaceRow = (data: Race, index, setData, setVisible) => {
  const raceStore = useRaceStore();
  console.log(data);

  return (
    <DataTable.Row
      key={index}
      style={[
        componentStyle.rowHeight,
        {
          backgroundColor:
            raceStore.DefaultDriver === data.Username ? 'darkgray' : 'gray',
        },
      ]}
      onPress={() => {
        setData(data);
        setVisible(true);
      }}>
      <View style={[styles.row, {paddingVertical: 10}]}>
        <View
          style={[
            styles.column,
            styles.alignCenter,
            styles.justifyCenter,
            {flex: 0},
          ]}>
          <Image
            source={{uri: data.Avatar}}
            style={componentStyle.image}
            resizeMode={'contain'}
            PlaceholderContent={<ActivityIndicator color={'#fff'} />}
            placeholderStyle={componentStyle.gray}
          />
        </View>
        <View style={[styles.column, styles.alignCenter, styles.justifyCenter]}>
          <View
            style={[
              styles.row,
              styles.alignCenter,
              styles.justifySpaceBetween,
              styles.paddingHorizontal5,
            ]}>
            <Caption style={{width: '100%', textAlign: 'center'}}>
              {data.FullName}
            </Caption>
          </View>
          <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
            <AntDesign name={'clockcircleo'} size={15} color={'#fff'} />
            <Paragraph style={styles.paddingHorizontal5}>
              {data.BestTime}
            </Paragraph>
            <AntDesign name={'user'} size={15} color={'#fff'} />
            <Paragraph style={styles.paddingHorizontal5}>
              {data.Laps[data.Laps.length - 1].PositionInClass !== undefined
                ? data.Laps[data.Laps.length - 1].PositionInClass
                : data.FinishPosition}
            </Paragraph>
          </View>
          <View style={[styles.row]}>
            <Paragraph
              style={[
                componentStyle.caption,
                {
                  backgroundColor:
                    data.RatingChange >= 0 ? '#24B533' : '#BB2124',
                  borderTopLeftRadius: 2.5,
                  borderBottomLeftRadius: 2.5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                },
              ]}>
              <AntIcon name={'solution1'} size={15} color={'white'} />{' '}
              {data.RatingChange}
            </Paragraph>
            <Paragraph
              style={[
                componentStyle.caption,
                {
                  backgroundColor:
                    data.ReputationChange >= 0 ? '#24B533' : '#BB2124',
                  borderTopRightRadius: 2.5,
                  borderBottomRightRadius: 2.5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                },
              ]}>
              <AntIcon name={'exception1'} size={15} color={'white'} />{' '}
              {data.ReputationChange}
            </Paragraph>
          </View>
        </View>
        <View
          style={[
            styles.column,
            styles.alignCenter,
            styles.justifyCenter,
            {flex: 0},
          ]}>
          <Image
            source={{uri: data.Livery + '&size=small'}}
            style={componentStyle.imageCar}
            resizeMode={'contain'}
            PlaceholderContent={<ActivityIndicator color={'#fff'} />}
            placeholderStyle={componentStyle.gray}
          />
        </View>
      </View>
    </DataTable.Row>
  );
};

const RaceTable = ({data}) => {
  const [visible, setVisible] = useState(false);
  const [modalData, setData] = useState(null);

  return (
    <>
      <DataTable>
        <ScrollView>
          {data.map((driver, index) =>
            RaceRow(driver, index, setData, setVisible),
          )}
        </ScrollView>
      </DataTable>
      {modalData === null ? null : (
        <RaceModal
          modalVisible={visible}
          setModalVisible={setVisible}
          data={modalData}
        />
      )}
    </>
  );
};

export default RaceTable;
