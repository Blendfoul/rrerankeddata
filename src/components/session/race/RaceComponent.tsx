import React, {useContext} from 'react';
import {Incident, RaceResult} from '../../../types/resultData';
import {useTheme} from 'react-native-paper';
import {Image, ScrollView, View} from 'react-native';
import RaceLapsTable from './RaceLapsTable';
import {styles} from '../../utils/Theme';
import TextContainer from '../../utils/TextContainer';
import {LocalizationContext} from '../../translations/LocalizationContext';
import useSectorTimes from '../../../hooks/useSectorTimes';
import {incidentType} from '../RaceModal';

interface RaceProps {
  route: any;
}

const RaceComponent: React.FC<RaceProps> = ({route}) => {
  const {data}: {data: RaceResult} = route.params;
  const {translations} = useContext(LocalizationContext);
  const {lapTime, sectors} = useSectorTimes(data.Laps);
  const theme = useTheme();

  const renderIncidentCounts = (IncidentDetails: Incident[]) => {
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
    <ScrollView style={{backgroundColor: theme.colors.primary}}>
      <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
        <Image
          source={{
            uri: `https://game.raceroom.com/store/image_redirect?id=${data.LiveryId.Id}&amp;&size=small`,
          }}
          resizeMode={'contain'}
          style={styles.liveryImage}
        />
      </View>
      <View style={[styles.row, styles.justifyEvenly, styles.paddingTop15]}>
        <TextContainer title={data.Username} />
      </View>
      <View style={[styles.row, styles.justifyEvenly, styles.paddingTop15]}>
        <TextContainer title={translations.profile.name} text={data.FullName} />
        <TextContainer title={translations.raceModal.team} text={data.Team} />
      </View>
      <View style={[styles.row, styles.justifyEvenly, styles.paddingTop15]}>
        <TextContainer
          title={translations.raceModal.start}
          text={'P' + data.StartPositionInClass}
        />
        <TextContainer
          title={translations.raceModal.finish}
          text={'P' + data.FinishPositionInClass}
        />
      </View>
      <View style={[styles.row, styles.justifyEvenly, styles.paddingTop15]}>
        <TextContainer
          title={translations.raceModal.rating}
          text={data.RatingChange}
        />
        <TextContainer
          title={translations.raceModal.reputation}
          text={data.ReputationChange}
        />
      </View>
      <View style={[styles.row, styles.justifyEvenly, styles.paddingTop15]}>
        <TextContainer title={translations.raceModal.bestLap} text={lapTime} />
      </View>
      <View style={[styles.column, styles.justifyEvenly, styles.paddingTop15]}>
        <TextContainer title={translations.raceModal.incidents} />
        {renderIncidentCounts(data.Incidents)}
      </View>
      <RaceLapsTable laps={data.Laps} best={sectors} />
    </ScrollView>
  );
};

export default RaceComponent;
