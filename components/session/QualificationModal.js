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
import type {QualiData} from '../../interfaces/RaceData';
import {incidentType} from './RaceModal';
import {qualificationModal} from '../../assets/strings/en.json';

const QualificationModal = ({
  modalVisible,
  setModalVisible,
  data,
}: {
  modalVisible: Boolean,
  setModalVisible: Boolean => void,
  data: QualiData,
}) => {
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const onCopyText = () => {
    Clipboard.setString('');
    setVisible(true);
  };

  const optimal = () => {
    let value = 0;
    data?.FastestSector.map(
      (number, index) =>
        (value +=
          index !== 0 ? number - data.FastestSector[index - 1] : number),
    );

    return `${Math.floor((value / 1000 / 60) << 0)}:${(
      (value / 1000) %
      60
    ).toFixed(3)}s`;
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
          </View>
          <View
            style={[
              styles.row,
              styles.alignCenter,
              styles.justifyCenter,
              styles.padding5,
            ]}>
            <TextContainer
              title={qualificationModal.fastest}
              text={data?.BestTime}
            />
            <TextContainer
              title={qualificationModal.position}
              text={data?.FinishPosition}
            />
          </View>
          <View
            style={[
              styles.row,
              styles.alignCenter,
              styles.justifyCenter,
              styles.padding5,
            ]}>
            {data?.BestSectorsTimes.map((number, index) => (
              <TextContainer
                key={index}
                title={qualificationModal.sector + (index + 1)}
                text={
                  (index !== 0
                    ? (number - data.BestSectorsTimes[index - 1]) / 1000
                    : number / 1000) + 's'
                }
              />
            ))}
          </View>
          <View
            style={[
              styles.row,
              styles.alignCenter,
              styles.justifyCenter,
              styles.padding5,
            ]}>
            <TextContainer
              title={qualificationModal.optimal}
              text={optimal()}
            />
          </View>
          <View
            style={[
              styles.row,
              styles.alignCenter,
              styles.justifyCenter,
              styles.padding5,
            ]}>
            {data?.FastestSector.map((number, index) => (
              <TextContainer
                key={index}
                title={qualificationModal.sector + (index + 1)}
                text={
                  (index !== 0
                    ? (number - data.FastestSector[index - 1]) / 1000
                    : number / 1000) + 's'
                }
              />
            ))}
          </View>
          <View
            style={[
              styles.row,
              styles.alignCenter,
              styles.justifyCenter,
              styles.padding5,
            ]}>
            <TextContainer
              title={qualificationModal.incidents}
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

export default QualificationModal;
