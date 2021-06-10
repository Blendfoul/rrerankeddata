import React, {useContext} from 'react';
import type {RaceInfo} from '../../types/raceData';
import {ScrollView, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TextContainer from '../utils/TextContainer';
import {styles} from '../utils/Theme';
import {LocalizationContext} from '../translations/LocalizationContext';
import TrackImage from '../utils/TrackImage';

interface SessionDataProps {
  info: RaceInfo;
  layoutId: {
    Name: string;
    Id: number;
  };
}

const SessionDataInfo: React.FC<SessionDataProps> = props => {
  const data: RaceInfo = props.info;
  const {translations} = useContext(LocalizationContext);

  return (
    <ScrollView style={[styles.column, styles.backgroundColorTarget]}>
      <View style={[styles.root, {padding: 0, overflow: 'hidden'}]}>
        <TrackImage trackId={props.layoutId.Id} />
      </View>
      <DriversOverall
        data={data}
        layoutId={props.layoutId.Name}
        translations={translations}
      />
      <DataAverage data={data} translations={translations} />
      <DataOverall data={data} translations={translations} />
      <LaptimeData data={data} translations={translations} />
    </ScrollView>
  );
};

interface DriverOverallProps {
  data: RaceInfo;
  layoutId: string;
  translations: any;
}

const DriversOverall: React.FC<DriverOverallProps> = ({
  data,
  layoutId,
  translations,
}) => {
  return (
    <>
      <View style={[styles.root, styles.row, {paddingVertical: 10}]}>
        <TextContainer title={translations.session.layout} text={layoutId} />
      </View>
      <View style={[styles.root, styles.row, {paddingVertical: 10}]}>
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
};

interface DataProps {
  data: RaceInfo;
  translations: any;
}

const DataOverall: React.FC<DataProps> = ({data, translations}) => {
  return (
    <View style={[styles.root, styles.row, {paddingVertical: 10}]}>
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
};

const DataAverage: React.FC<DataProps> = ({data, translations}) => {
  return (
    <View style={[styles.root, styles.row, {paddingVertical: 10}]}>
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
};

const LaptimeData: React.FC<DataProps> = ({data, translations}) => {
  return (
    <View style={[styles.root, styles.row, {paddingVertical: 10}]}>
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
};

export default SessionDataInfo;
