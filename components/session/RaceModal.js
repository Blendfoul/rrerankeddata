import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {styles} from '../utils/Theme';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Image} from 'react-native-elements';
import Clipboard from '@react-native-clipboard/clipboard';
import {Snackbar} from 'react-native-paper';
import TextContainer from '../utils/TextContainer';
import RaceLapsTable from './RaceLapsTable';
import {raceModal, incidents} from '../../assets/strings/en.json';

const RaceModal = ({modalVisible, setModalVisible, data}) => {
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const onCopyText = () => {
    Clipboard.setString(data.Username);
    setVisible(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <ScrollView style={[styles.column]}>
        <View
          style={[
            styles.backgroundColor,
            styles.alignCenter,
            styles.justifyCenter,
            styles.modalView,
          ]}>
          <View
            style={[
              styles.row,
              styles.alignCenter,
              styles.justifySpaceBetween,
              styles.padding10,
            ]}>
            <Pressable onPress={onCopyText}>
              <Text style={styles.title}>{data?.Username}</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <AntIcon color={'white'} name={'close'} size={25} />
            </Pressable>
          </View>
          <View
            style={[
              styles.column,
              styles.alignCenter,
              styles.justifyCenter,
              styles.padding5,
            ]}>
            <Image
              source={
                data?.Livery !== undefined
                  ? {uri: data.Livery + '&size=small'}
                  : require('../../assets/r3e.png')
              }
              resizeMode={'contain'}
              style={styles.liveryImage}
              PlaceholderContent={
                <ActivityIndicator size={'large'} color={'#fff'} />
              }
              placeholderStyle={styles.backgroundColor}
            />
            <View
              style={[
                styles.row,
                styles.alignCenter,
                styles.justifyCenter,
                styles.padding5,
              ]}>
              <TextContainer title={raceModal.name} text={data?.FullName} />
              <TextContainer title={raceModal.team} text={data?.Team} />
            </View>
            <View
              style={[
                styles.row,
                styles.alignCenter,
                styles.justifyCenter,
                styles.padding5,
              ]}>
              <TextContainer title={raceModal.bestLap} text={data?.BestTime} />
              <TextContainer
                title={raceModal.worstLap}
                text={data?.WorstTime}
              />
            </View>
            <View
              style={[
                styles.row,
                styles.alignCenter,
                styles.justifyCenter,
                styles.padding5,
              ]}>
              <TextContainer
                title={raceModal.averageLap}
                text={data?.AvgTime}
              />
              <TextContainer title={raceModal.diff} text={data?.DiffTime} />
            </View>
            <View
              style={[
                styles.row,
                styles.alignCenter,
                styles.justifyCenter,
                styles.padding5,
              ]}>
              <TextContainer
                title={raceModal.start}
                text={'P' + data?.StartPosition}
              />
              <TextContainer title={raceModal.diff} text={data?.DiffPosition} />
              <TextContainer
                title={raceModal.finish}
                text={'P' + data?.FinishPosition}
              />
            </View>
            <View
              style={[
                styles.row,
                styles.alignCenter,
                styles.justifyCenter,
                styles.padding5,
              ]}>
              <TextContainer
                title={raceModal.incidents}
                text={data?.Incidents}
              />
            </View>
            <View style={styles.row}>
              {data?.IncidentsDetails.map((data, index) => (
                <TextContainer
                  key={index}
                  title={incidentType(data.Type)}
                  text={data.Count + 'x'}
                />
              ))}
            </View>
            <RaceLapsTable laps={data?.Laps} best={data?.BestSectorsTimes} />
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: onDismissSnackBar,
        }}>
        Username copied to clipboard.
      </Snackbar>
    </Modal>
  );
};

export default RaceModal;

export function incidentType(type: String) {
  switch (type) {
    case 'InvalidLap':
      return incidents.invalidLap;
    case 'LosingControl':
      return incidents.losingControl;
    case 'Track':
      return incidents.trackCollision;
    case 'Vehicle':
      return incidents.vehicleCollision;
    case 'Disconnect':
      return incidents.disconnect;
  }
}
