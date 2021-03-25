import React, {useState} from 'react';
import {TabBar, TabView} from 'react-native-tab-view';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AntIcon from 'react-native-vector-icons/AntDesign';
import type {QualiData, Race} from './RaceData';
import {Image} from 'react-native-elements';

const QualiRoute = props => (
  <ScrollView style={style.tab}>
    <DataTable>
      <DataTable.Header>
        <DataTable.Cell style={[data.cell, {justifyContent: 'center'}]}>
          <AntDesign name={'Trophy'} size={25} color={'#fff'} />
        </DataTable.Cell>
        <DataTable.Cell
          style={[data.time, {justifyContent: 'center'}]}
          centered>
          <AntDesign name={'user'} size={25} color={'#fff'} />
        </DataTable.Cell>
        <DataTable.Cell
          style={[data.time, {justifyContent: 'center'}]}
          centered>
          <AntDesign name={'car'} size={25} color={'#fff'} />
        </DataTable.Cell>
        <DataTable.Cell style={[data.cell, {justifyContent: 'center'}]} numeric>
          <AntDesign name={'exception1'} size={25} color={'#fff'} />
        </DataTable.Cell>
        <DataTable.Cell style={[data.time, {justifyContent: 'center'}]} numeric>
          <AntDesign name={'clockcircle'} size={25} color={'#fff'} />
        </DataTable.Cell>
      </DataTable.Header>
      {props.data.map((driver: QualiData, index: Number) => (
        <DataTable.Row key={index} style={data.row}>
          <DataTable.Cell
            style={[data.cell, {justifyContent: 'center'}]}
            centered>
            <Text>{driver.FinishPosition}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={data.imageCell}>
            <Image
              source={{uri: driver.Avatar}}
              style={data.imageDriver}
              resizeMode={'contain'}
            />
          </DataTable.Cell>
          <DataTable.Cell style={data.imageCell}>
            <Image
              source={{uri: driver.Livery + '&size=small'}}
              style={data.imageCar}
              resizeMode={'contain'}
            />
          </DataTable.Cell>
          <DataTable.Cell
            style={[data.cell, {justifyContent: 'center'}]}
            numeric>
            <Text>{driver.Incidents}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={data.time} numeric>
            <Text>{driver.BestTime}</Text>
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  </ScrollView>
);

const data = StyleSheet.create({
  imageCell: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageDriver: {
    width: 50,
    height: 50,
  },
  imageCar: {
    width: 62.5,
    height: 45,
  },
  cell: {
    flex: 1,
  },
  time: {
    flex: 2,
  },
  row: {
    height: 75,
  },
});

function RaceRow(props: {onPress: () => void, driver: Race}) {
  return (
    <Pressable onPress={props.onPress}>
      <DataTable.Row style={data.row}>
        <DataTable.Cell
          style={[data.cell, {justifyContent: 'center'}]}
          centered>
          <Text>{props.driver.FinishPosition}</Text>
        </DataTable.Cell>
        <DataTable.Cell style={data.imageCell}>
          <Image
            source={{uri: props.driver.Avatar}}
            style={data.imageDriver}
            resizeMode={'contain'}
          />
        </DataTable.Cell>
        <DataTable.Cell style={data.imageCell}>
          <Image
            source={{uri: props.driver.Livery + '&size=small'}}
            style={data.imageCar}
            resizeMode={'contain'}
          />
        </DataTable.Cell>
        <DataTable.Cell
          style={[
            data.cell,
            {
              justifyContent: 'center',
              backgroundColor:
                props.driver.ReputationChange >= 0 ? '#24B533' : '#BB2124',
            },
          ]}
          numeric>
          <Text>{props.driver.ReputationChange}</Text>
        </DataTable.Cell>
        <DataTable.Cell
          style={[
            data.cell,
            {
              justifyContent: 'center',
              backgroundColor:
                props.driver.RatingChange >= 0 ? '#24B533' : '#BB2124',
            },
          ]}
          numeric>
          <Text>{props.driver.RatingChange}</Text>
        </DataTable.Cell>
      </DataTable.Row>
    </Pressable>
  );
}

function ModalData(props: {onPress: () => void, modalData: Race}) {
  return (
    <View style={style.centeredView}>
      <View style={style.modalView}>
        <View style={style.header}>
          <Text style={style.headerText}>{props.modalData?.Username}</Text>
          <Pressable onPress={props.onPress} style={style.closeButton}>
            <AntIcon color={'white'} name={'close'} size={25} />
          </Pressable>
        </View>
        <Image
          source={
            props.modalData.Livery !== undefined
              ? {uri: props.modalData.Livery + '&size=small'}
              : require('./assets/r3e.jpg')
          }
          style={{width: 200, height: 100}}
          resizeMode={'stretch'}
          on
        />
        <View style={style.data}>
          <View style={style.modalContainer}>
            <Text style={style.heading}>Name</Text>
            <Text style={style.text}>{props.modalData?.FullName}</Text>
          </View>
          <View style={style.modalContainer}>
            <Text style={style.heading}>Team</Text>
            <Text style={style.text}>{props.modalData?.Team}</Text>
          </View>
        </View>
        <View style={style.data}>
          <View style={style.modalContainer}>
            <Text style={style.heading}>Best Time</Text>
            <Text style={style.text}>{props.modalData?.BestTime}</Text>
          </View>
          <View style={style.modalContainer}>
            <Text style={style.heading}>Worst Time</Text>
            <Text style={style.text}>{props.modalData?.WorstTime}</Text>
          </View>
        </View>
        <View style={style.data}>
          <View style={style.modalContainer}>
            <Text style={style.heading}>Average Time</Text>
            <Text style={style.text}>{props.modalData?.AvgTime}</Text>
          </View>
          <View style={style.modalContainer}>
            <Text style={style.heading}>Diff. Time</Text>
            <Text style={style.text}>{props.modalData?.DiffTime}</Text>
          </View>
        </View>
        <View style={style.data}>
          <View style={style.modalContainer}>
            <Text style={style.heading}>Rating Change</Text>
            <Text style={style.text}>{props.modalData?.RatingChange}</Text>
          </View>
          <View style={style.modalContainer}>
            <Text style={style.heading}>Reputation Change</Text>
            <Text style={style.text}>{props.modalData?.ReputationChange}</Text>
          </View>
        </View>
        <View style={style.data}>
          <View style={style.modalContainer}>
            <Text style={style.heading}>Start Pos.</Text>
            <Text style={style.text}>{props.modalData?.StartPosition}</Text>
          </View>
          <View style={style.modalContainer}>
            <Text style={style.heading}>Finish Pos.</Text>
            <Text style={style.text}>{props.modalData?.FinishPosition}</Text>
          </View>
          <View style={style.modalContainer}>
            <Text style={style.heading}>Diff Pos.</Text>
            <Text style={style.text}>{props.modalData?.DiffPosition}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const RaceRoute = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData]: [Race, (race: Race) => void] = useState({
    Livery: '',
  });

  return (
    <ScrollView style={style.tab}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ModalData
          onPress={() => setModalVisible(!modalVisible)}
          modalData={modalData}
        />
      </Modal>

      <DataTable>
        <DataTable.Header>
          <DataTable.Cell style={[data.cell, {justifyContent: 'center'}]}>
            <AntDesign name={'Trophy'} size={25} color={'#fff'} />
          </DataTable.Cell>
          <DataTable.Cell
            style={[data.time, {justifyContent: 'center'}]}
            centered>
            <AntDesign name={'user'} size={25} color={'#fff'} />
          </DataTable.Cell>
          <DataTable.Cell
            style={[data.time, {justifyContent: 'center'}]}
            centered>
            <AntDesign name={'car'} size={25} color={'#fff'} />
          </DataTable.Cell>
          <DataTable.Cell
            style={[data.cell, {justifyContent: 'center'}]}
            numeric>
            <AntDesign name={'exception1'} size={25} color={'#fff'} />
          </DataTable.Cell>
          <DataTable.Cell
            style={[data.cell, {justifyContent: 'center'}]}
            numeric>
            <AntDesign name={'solution1'} size={25} color={'#fff'} />
          </DataTable.Cell>
        </DataTable.Header>
        {props.data.map((driver: Race, index: Number) => (
          <RaceRow
            key={index}
            onPress={() => {
              setModalData(driver);
              setModalVisible(true);
            }}
            driver={driver}
          />
        ))}
      </DataTable>
    </ScrollView>
  );
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={style.container}
    style={{backgroundColor: 'gray'}}
  />
);

const TimesTable = props => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'quali', title: 'Qualify'},
    {key: 'race', title: 'Race'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'quali':
        return <QualiRoute data={props.info.Quali} />;
      case 'race':
        return <RaceRoute data={props.info.Race} />;
      default:
        return null;
    }
  };

  const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
  };

  return (
    <View style={style.tab}>
      <TabView
        lazy
        scrollEnabled
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#2f2f2f',
  },
  tab: {flex: 2, backgroundColor: 'gray', marginTop: 10},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#2f2f2f',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 5,
  },
  data: {
    flex: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  heading: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    paddingTop: 10,
    color: '#fff',
    textAlign: 'center',
  },
  closeButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});

export default TimesTable;
