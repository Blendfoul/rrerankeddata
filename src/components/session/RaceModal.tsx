import React, {Dispatch, SetStateAction, useContext} from 'react';
import {Modal, Pressable, ScrollView, Text, View, Image} from 'react-native';
import {styles} from '../utils/Theme';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Clipboard from '@react-native-clipboard/clipboard';
import {Snackbar} from 'react-native-paper';
import TextContainer from '../utils/TextContainer';
import RaceLapsTable from './race/RaceLapsTable';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Race} from '../../types/raceData';

interface RaceModalProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  data: Race;
}

const RaceModal: React.FC<RaceModalProps> = ({
  modalVisible,
  setModalVisible,
  data,
}) => {
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const {translations} = useContext(LocalizationContext);

  const onCopyText = () => {
    Clipboard.setString(data.Username);
    setVisible(true);
  };

  const calculateOptimalLap = (sectors: number[]) => {
    if (sectors !== undefined) {
      const value =
        sectors[2] -
        sectors[1] +
        (sectors[1] - data.FastestSector[0]) +
        sectors[0];

      return `${Math.floor((value / 1000 / 60) << 0)}:${(
        (value / 1000) %
        60
      ).toFixed(3)}s`;
    } else {
      return '-';
    }
  };

  const renderIncidentCounts = (
    IncidentDetails: {Type: string; Count: number}[],
  ) => {
    const elements = [];

    for (let index = 0; index < IncidentDetails.length; index = index + 2) {
      if (index >= IncidentDetails.length) {
        break;
      }

      elements.push(
        <View
          style={[
            styles.row,
            styles.alignCenter,
            styles.justifyCenter,
            {width: '100%'},
          ]}>
          <TextContainer
            title={incidentType(IncidentDetails[index].Type, translations)}
            text={IncidentDetails[index].Count + 'x'}
          />
          {index + 1 !== IncidentDetails.length ? (
            <TextContainer
              title={incidentType(
                IncidentDetails[index + 1].Type,
                translations,
              )}
              text={IncidentDetails[index + 1].Count + 'x'}
            />
          ) : null}
        </View>,
      );
    }

    return elements;
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
            styles.backgroundColorTarget,
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
            />
            <View
              style={[
                styles.row,
                styles.alignCenter,
                styles.justifyCenter,
                styles.padding5,
              ]}>
              <TextContainer
                title={translations.raceModal.name}
                text={data.FullName}
              />
              <TextContainer
                title={translations.raceModal.team}
                text={data.Team}
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
                title={translations.raceModal.rating}
                text={data.RatingChange}
              />
              <TextContainer
                title={translations.raceModal.reputation}
                text={data.ReputationChange}
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
                title={translations.raceModal.optimalLap}
                text={calculateOptimalLap(data.BestSectorsTimes)}
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
                title={translations.raceModal.bestLap}
                text={data.BestTime}
              />
              <TextContainer
                title={translations.raceModal.worstLap}
                text={data.WorstTime}
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
                title={translations.raceModal.averageLap}
                text={data.AvgTime}
              />
              <TextContainer
                title={translations.raceModal.diff}
                text={data.DiffTime}
              />
            </View>

            {data.Laps[data.Laps.length - 1].Position !==
            data.Laps[data.Laps.length - 1].PositionInClass ? (
              <View
                style={[
                  styles.row,
                  styles.alignCenter,
                  styles.justifyCenter,
                  styles.padding5,
                ]}>
                <TextContainer
                  title={translations.raceModal.start}
                  text={'P' + data.Laps[0].PositionInClass}
                />
                <TextContainer
                  title={translations.raceModal.diff}
                  text={data.DiffPosition}
                />
                <TextContainer
                  title={translations.raceModal.finish}
                  text={'P' + data.Laps[data.Laps.length - 1].PositionInClass}
                />
              </View>
            ) : (
              <View
                style={[
                  styles.row,
                  styles.alignCenter,
                  styles.justifyCenter,
                  styles.padding5,
                ]}>
                <TextContainer
                  title={translations.raceModal.start}
                  text={'P' + data.StartPosition}
                />
                <TextContainer
                  title={translations.raceModal.diff}
                  text={data.DiffPosition}
                />
                <TextContainer
                  title={translations.raceModal.finish}
                  text={'P' + data.FinishPosition}
                />
              </View>
            )}
            <View
              style={[
                styles.row,
                styles.alignCenter,
                styles.justifyCenter,
                styles.padding5,
              ]}>
              <TextContainer
                title={translations.raceModal.incidents}
                text={data.Incidents}
              />
            </View>
            <View style={[styles.column]}>
              {renderIncidentCounts(data.IncidentsDetails)}
            </View>
            <RaceLapsTable laps={data?.Laps} best={data.BestSectorsTimes} />
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
        {translations.messages.copied}
      </Snackbar>
    </Modal>
  );
};

export default RaceModal;

export function incidentType(type: String, translations: any) {
  switch (type) {
    case 'InvalidLap':
      return translations.incidents.invalidLap;
    case 'LosingControl':
      return translations.incidents.losingControl;
    case 'Track':
      return translations.incidents.trackCollision;
    case 'Vehicle':
      return translations.incidents.vehicleCollision;
    case 'Disconnect':
      return translations.incidents.disconnect;
    case 'NonServedPenalty':
      return translations.incidents.unservedPenalty;
    case 'WrongWay':
      return translations.incidents.wrongWay;
  }
}