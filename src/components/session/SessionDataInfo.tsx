import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Card} from 'react-native-paper';
import TextContainer from '../utils/TextContainer';
import useSessionClasses from '../../hooks/useSessionClasses';
import CarClass from '../utils/CarClass';
import {useRaceContext} from '../../store/RaceContext';
import {useRoute} from '@react-navigation/core';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {SessionMaterialStackList} from '../../types/NavigatorProps';

type Props = MaterialTopTabScreenProps<SessionMaterialStackList, 'data'>;

const SessionDataInfo: React.FC = () => {
  const {translations} = useContext(LocalizationContext);
  const {params} = useRoute<Props['route']>();

  const [state] = useRaceContext();
  const {ids} = useSessionClasses(params.data.QualiResult);
  const driverData = params.data.RaceResult.find(
    driver => driver.Username === state.defaultDriver,
  );

  const styles = StyleSheet.create({
    root: {
      margin: 5,
    },
    trackImage: {
      width: 75,
      height: 75,
      marginRight: 15,
    },
    title: {
      textAlign: 'center',
    },
    contentRoot: {
      paddingTop: 15,
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });

  return (
    <ScrollView>
      <Card style={styles.root}>
        <Card.Cover
          source={{
            uri: `https://game.raceroom.com/store/image_redirect?id=${params.data.TrackId.Id}&amp;size=full`,
          }}
        />
        <Card.Title
          title={params.data.TrackId.Name}
          subtitle={params.data.TrackLayoutId.Name}
          right={props => (
            <Image
              source={{
                uri: `https://game.raceroom.com/store/image_redirect?id=${params.data.TrackLayoutId.Id}&amp;size=small`,
              }}
              {...props}
              style={styles.trackImage}
            />
          )}
        />
        <Card.Content>
          <View style={styles.contentRoot}>
            <CarClass classId={ids} size={40} imgSize={'small'} />
          </View>
          <View style={styles.contentRoot}>
            <TextContainer
              title={translations.session.drivers}
              text={params.data.RaceInfos.Drivers}
            />
            <TextContainer
              title={translations.session.fastest}
              text={params.data.RaceInfos.BestLaptimeOverallText}
            />
          </View>
          <View style={styles.contentRoot}>
            <TextContainer
              title={translations.session.averageLap}
              text={params.data.RaceInfos.AvgLaptimeOverallText}
            />
            <TextContainer
              title={translations.session.diffTimer}
              text={params.data.RaceInfos.AvgDiffFastestLapMillisecounds}
            />
          </View>
          <View style={styles.contentRoot}>
            <TextContainer
              title={'Total Incidents'}
              text={params.data.RaceInfos.IncidentsOverall}
            />
          </View>
          {driverData !== undefined ? (
            <React.Fragment>
              <View style={styles.contentRoot}>
                <TextContainer title={translations.session.UserResults} />
              </View>
              <View style={styles.contentRoot}>
                <TextContainer
                  title={translations.session.CarClass}
                  text={driverData!.CarClass.Name}
                />
                <TextContainer
                  title={translations.session.LapsCompleted}
                  text={driverData!.Laps.length}
                />
              </View>
              <View style={styles.contentRoot}>
                <TextContainer
                  title={translations.session.StartPosition}
                  text={driverData!.StartPositionInClass}
                />
                <TextContainer
                  title={translations.session.FinishPosition}
                  text={driverData!.FinishPositionInClass}
                />
              </View>
              <View style={styles.contentRoot}>
                <TextContainer
                  title={translations.session.RatingAfter}
                  text={driverData!.RatingAfter}
                />
                <TextContainer
                  title={translations.session.ReputationAfter}
                  text={driverData!.ReputationAfter}
                />
              </View>
            </React.Fragment>
          ) : null}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default SessionDataInfo;
