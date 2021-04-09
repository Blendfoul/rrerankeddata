import React, {useState} from 'react';
import {DataTable} from 'react-native-paper';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RaceModal from './RaceModal';
import {styles} from '../utils/Theme';
import {Image} from 'react-native-elements';
import Race from '../race/Race';

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

const RaceTitle = ({icon}) => (
  <DataTable.Title style={[componentStyle.flex_1, styles.justifyCenter]}>
    {icon}
  </DataTable.Title>
);

const RaceCell = ({data, style}) => (
  <DataTable.Cell
    style={[
      componentStyle.flex_1,
      styles.justifyCenter,
      styles.alignCenter,
      style,
    ]}>
    {data}
  </DataTable.Cell>
);

const RaceRow = (data: Race, index, setData, setVisible) => {
  return (
    <DataTable.Row
      key={index}
      style={componentStyle.rowHeight}
      onPress={() => {
        setData(data);
        setVisible(true);
      }}>
      <RaceCell
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
      <RaceCell
        data={
          <Image
            source={{uri: data.Livery + '&size=small'}}
            style={componentStyle.image}
            resizeMode={'contain'}
            PlaceholderContent={<ActivityIndicator color={'#fff'} />}
            placeholderStyle={componentStyle.gray}
          />
        }
      />
      <RaceCell
        data={data.ReputationChange}
        style={{
          backgroundColor: data.ReputationChange >= 0 ? '#24B533' : '#BB2124',
        }}
      />
      <RaceCell
        data={data.RatingChange}
        style={{
          backgroundColor: data.RatingChange >= 0 ? '#24B533' : '#BB2124',
        }}
      />
    </DataTable.Row>
  );
};

const RaceTable = ({data}) => {
  const [visible, setVisible] = useState(false);
  const [modalData, setData] = useState(null);

  return (
    <>
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <RaceTitle
              icon={<AntDesign name={'user'} color={'#fff'} size={25} />}
            />
            <RaceTitle
              icon={<AntDesign name={'car'} color={'#fff'} size={25} />}
            />
            <RaceTitle
              icon={<AntDesign name={'exception1'} color={'#fff'} size={25} />}
            />
            <RaceTitle
              icon={<AntDesign name={'solution1'} color={'#fff'} size={25} />}
            />
          </DataTable.Header>
          {data.map((driver, index) =>
            RaceRow(driver, index, setData, setVisible),
          )}
        </DataTable>
      </ScrollView>
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
