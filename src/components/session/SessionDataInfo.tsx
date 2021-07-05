import React, {useContext} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Card, useTheme} from 'react-native-paper';
import {MpRaceResult} from '../../types/resultData';
import TextContainer from '../utils/TextContainer';
import useSessionClasses from '../../hooks/useSessionClasses';
import CarClass from '../utils/CarClass';

interface SessionDataProps {
  data: MpRaceResult;
}

const SessionDataInfo: React.FC<SessionDataProps> = ({data}) => {
  const {translations} = useContext(LocalizationContext);
  const {colors} = useTheme();
  const {ids} = useSessionClasses(data.QualiResult);

  const styles = StyleSheet.create({
    root: {
      backgroundColor: colors.primary,
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
      </Card.Content>
    </Card>
  );
};

export default SessionDataInfo;
