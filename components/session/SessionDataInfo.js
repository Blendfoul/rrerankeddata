import React, {useContext} from 'react';
import type {RaceInfo} from '../../interfaces/RaceData';
import {View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TextContainer from '../utils/TextContainer';
import {styles} from '../utils/Theme';
import {LocalizationContext} from '../translations/LocalizationContext';

const SessionDataInfo = (props: {info: RaceInfo}) => {
  const data: RaceInfo = props.info;
  const {translations} = useContext(LocalizationContext);

  return (
    <View style={[styles.column, styles.backgroundColor]}>
      <DriversOverall
        data={data}
        layoutId={props.layoutId}
        translations={translations}
      />
      <DataAverage data={data} translations={translations} />
      <DataOverall data={data} translations={translations} />
      <LaptimeData data={data} translations={translations} />
    </View>
  );
};

function DriversOverall({
  data,
  layoutId,
  translations,
}: {
  data: RaceInfo,
  layoutId: String,
}) {
  return (
    <>
      <View style={styles.row}>
        <TextContainer title={translations.session.layout} text={layoutId} />
      </View>
      <View style={styles.row}>
        <TextContainer
          title={translations.session.drivers}
          icon={<AntIcon name={'team'} color={'#fff'} size={15} />}
          text={data.Drivers}
        />
        <TextContainer
          title={translations.session.positions}
          text={data.PositionsGainedOverall}
        />
      </View>
    </>
  );
}

function DataOverall({data, translations}) {
  return (
    <View style={styles.row}>
      <TextContainer
        title={translations.session.overall}
        icon={
          <AntIcon
            name={'solution1'}
            color={data.RatingOverall >= 0 ? '#24B533' : '#BB2124'}
            size={15}
          />
        }
        text={data.RatingOverall}
      />
      <TextContainer
        title={translations.session.overall}
        icon={<AntIcon name={'close'} color={'#fff'} size={15} />}
        text={data.IncidentsOverall}
      />
      <TextContainer
        title={translations.session.overall}
        icon={
          <AntIcon
            name={'exception1'}
            color={data.ReputationOverall >= 0 ? '#24B533' : '#BB2124'}
            size={15}
          />
        }
        text={data.ReputationOverall}
      />
    </View>
  );
}

function DataAverage({data, translations}) {
  return (
    <View style={styles.row}>
      <TextContainer
        title={translations.session.average}
        icon={
          <AntIcon
            name={'solution1'}
            color={data.RatingAverage >= 0 ? '#24B533' : '#BB2124'}
            size={15}
          />
        }
        text={data.RatingAverage}
      />
      <TextContainer
        title={translations.session.average}
        icon={<AntIcon name={'close'} color={'#fff'} size={15} />}
        text={data.IncidentsAverage}
      />
      <TextContainer
        title={translations.session.average}
        icon={
          <AntIcon
            name={'exception1'}
            color={data.ReputationAverage >= 0 ? '#24B533' : '#BB2124'}
            size={15}
          />
        }
        text={data.ReputationAverage}
      />
    </View>
  );
}

function LaptimeData({data, translations}) {
  return (
    <View style={styles.row}>
      <TextContainer
        title={translations.session.fastest}
        text={data.BestLaptimeOverallText}
        titleSize={14}
      />
      <TextContainer
        title={translations.session.averageLap}
        text={data.AvgLaptimeOverallText}
        titleSize={14}
      />
      <TextContainer
        title={translations.session.diffTimer}
        text={data.MaxDiffFastestLapText}
        titleSize={14}
      />
    </View>
  );
}

export default SessionDataInfo;
