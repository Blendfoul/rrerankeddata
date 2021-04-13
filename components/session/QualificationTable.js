import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Caption, DataTable, Paragraph} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import type {QualiData} from '../../interfaces/RaceData';
import {Image} from 'react-native-elements';
import React, {useState} from 'react';
import {styles} from '../utils/Theme';
import QualificationModal from './QualificationModal';
import {useRaceStore} from '../../store/RaceContext';

const componentStyle = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  flex_2: {
    flex: 2,
  },
  rowHeight: {
    height: 75,
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

const QualificationRow = (data: QualiData, index, setData, setVisible) => {
  const raceStore = useRaceStore();

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
            <Caption style={{width: '100%', textAlign: 'center'}}>{data.FullName}</Caption>
          </View>
          <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
            <AntDesign name={'clockcircleo'} size={15} color={'#fff'} />
            <Paragraph style={styles.paddingHorizontal5}>
              {data.BestTime}
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

const QualificationTable = ({data}: {data: QualiData}) => {
  const [visible, setVisible] = useState(false);
  const [modalData, setData] = useState(null);

  return (
    <>
      <DataTable>
        <ScrollView>
          {data.map((data, index) =>
            QualificationRow(data, index, setData, setVisible),
          )}
        </ScrollView>
      </DataTable>
      <QualificationModal
        modalVisible={visible}
        setModalVisible={setVisible}
        data={modalData}
      />
    </>
  );
};

export default QualificationTable;
