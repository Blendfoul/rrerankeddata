import {ActivityIndicator, ScrollView, StyleSheet, Text} from 'react-native';
import {DataTable} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import type {QualiData} from '../../interfaces/RaceData';
import {Image} from 'react-native-elements';
import React, {useState} from 'react';
import {styles} from '../utils/Theme';
import QualificationModal from './QualificationModal';

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
  },
  imageCar: {
    width: 62.5,
    height: 50,
  },
  gray: {
    backgroundColor: 'gray',
  },
});

const QualificationTitle = ({icon}) => (
  <DataTable.Title style={[componentStyle.flex_1, styles.justifyCenter]}>
    {icon}
  </DataTable.Title>
);

const QualificationCell = ({data}) => (
  <DataTable.Cell
    style={[componentStyle.flex_1, styles.justifyCenter, styles.alignCenter]}>
    {data}
  </DataTable.Cell>
);

const QualificationRow = (data: QualiData, index, setData, setVisible) => (
  <DataTable.Row
    key={index}
    style={componentStyle.rowHeight}
    onPress={() => {
      setData(data);
      setVisible(true);
    }}>
    <QualificationCell
      data={
        <Image
          source={{uri: data.Avatar}}
          style={componentStyle.image}
          resizeMode={'contain'}
          PlaceholderContent={<ActivityIndicator color={'#fff'} />}
          placeholderStyle={componentStyle.gray}
        />
      }
    />
    <QualificationCell
      data={
        <Image
          source={{uri: data.Livery + '&size=small'}}
          style={componentStyle.imageCar}
          resizeMode={'contain'}
          PlaceholderContent={<ActivityIndicator color={'#fff'} />}
          placeholderStyle={componentStyle.gray}
        />
      }
    />
    <QualificationCell data={<Text>{data.BestTime}</Text>} />
  </DataTable.Row>
);

const QualificationTable = ({data}: {data: QualiData}) => {
  const [visible, setVisible] = useState(false);
  const [modalData, setData] = useState(null);

  return (
    <>
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <QualificationTitle
              icon={<AntDesign name={'user'} size={25} color={'#fff'} />}
            />
            <QualificationTitle
              icon={<AntDesign name={'car'} size={25} color={'#fff'} />}
            />
            <QualificationTitle
              icon={
                <AntDesign name={'clockcircleo'} size={25} color={'#fff'} />
              }
            />
          </DataTable.Header>
          {data.map((data, index) =>
            QualificationRow(data, index, setData, setVisible),
          )}
        </DataTable>
      </ScrollView>
      <QualificationModal
        modalVisible={visible}
        setModalVisible={setVisible}
        data={modalData}
      />
    </>
  );
};

export default QualificationTable;
