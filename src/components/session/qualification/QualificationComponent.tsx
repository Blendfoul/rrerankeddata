import React, {useContext} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {styles} from '../../utils/Theme';
import TextContainer from '../../utils/TextContainer';
import {LocalizationContext} from '../../translations/LocalizationContext';
import {Incident} from '../../../types/raceData';
import {incidentType} from '../RaceModal';
import {QualiResult} from '../../../types/resultData';
import useSectorTimes from '../../../hooks/useSectorTimes';
import LoadingActivity from '../../utils/LoadingActivity';

interface QualificationProps {
  route: any;
}

const QualificationComponent: React.FC<QualificationProps> = ({route}) => {
  const {data}: {data: QualiResult} = route.params;
  const {translations} = useContext(LocalizationContext);
  const {sectors, lapTime, loading} = useSectorTimes(data.Laps);

  if (loading) {
    return <LoadingActivity title={''} />;
  }

  return (
    <ScrollView style={styles.backgroundColorTarget}>
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
      </View>
      <View style={[styles.row, styles.justifyEvenly, styles.paddingTop15]}>
        <TextContainer
          title={translations.qualificationModal.fastest}
          text={lapTime}
        />
        <TextContainer
          title={translations.qualificationModal.position}
          text={data.FinishPosition}
        />
      </View>
      <View style={[styles.row, styles.paddingTop15]}>
        {sectors.map((value, index) => (
          <TextContainer
            key={`sector-${value}`}
            title={translations.qualificationModal.sector + (index + 1)}
            text={
              (index !== 0
                ? (value - sectors[index - 1]) / 1000
                : value / 1000) + 's'
            }
          />
        ))}
      </View>
      <View
        style={[
          styles.row,
          styles.alignCenter,
          styles.justifyCenter,
          styles.paddingTop15,
        ]}>
        <TextContainer title={translations.qualificationModal.incidents} />
      </View>
      <View style={styles.row}>
        {data.Incidents.map((incident: Incident, index: number) => (
          <TextContainer
            key={index}
            title={incidentType(incident.Type, translations)}
            text={incident.Count + 'x'}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default QualificationComponent;
