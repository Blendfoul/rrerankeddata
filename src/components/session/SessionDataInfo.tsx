import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Card, useTheme} from 'react-native-paper';
import {MpRaceResult} from '../../types/resultData';
import TextContainer from '../utils/TextContainer';
import useSessionClasses from '../../hooks/useSessionClasses';
import CarClass from '../utils/CarClass';
import {useRaceContext} from '../../store/RaceContext';

interface SessionDataProps {
  data: MpRaceResult;
}

const SessionDataInfo: React.FC<SessionDataProps> = ({data}) => {
  const {translations} = useContext(LocalizationContext);
  const {colors} = useTheme();
  const [state] = useRaceContext();
  const {ids} = useSessionClasses(data.QualiResult);
  const driverData = data.RaceResult.find(
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
            uri: `https://game.raceroom.com/store/image_redirect?id=${data.TrackId.Id}&amp;size=full`,
          }}
        />
        <Card.Title
          title={data.TrackId.Name}
          subtitle={data.TrackLayoutId.Name}
          right={props => (
            <Image
              source={{
                uri: `https://game.raceroom.com/store/image_redirect?id=${data.TrackLayoutId.Id}&amp;size=small`,
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
              text={data.RaceInfos.Drivers}
            />
            <TextContainer
              title={translations.session.fastest}
              text={data.RaceInfos.BestLaptimeOverallText}
            />
          </View>
          <View style={styles.contentRoot}>
            <TextContainer
              title={translations.session.averageLap}
              text={data.RaceInfos.AvgLaptimeOverallText}
            />
            <TextContainer
              title={translations.session.diffTimer}
              text={data.RaceInfos.AvgDiffFastestLapMillisecounds}
            />
          </View>
          <View style={styles.contentRoot}>
            <TextContainer
              title={'Total Incidents'}
              text={data.RaceInfos.IncidentsOverall}
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
