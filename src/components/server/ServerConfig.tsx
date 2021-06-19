import React, {useContext} from 'react';
import {ServerData} from '../../types/server';
import {Card, useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import TextContainer from '../utils/TextContainer';
import {LocalizationContext} from '../translations/LocalizationContext';
import {useRaceContext} from '../../store/RaceContext';
import useRaceSession from '../../hooks/useRaceSession';
//@ts-ignore
import CountDown from 'react-native-countdown-component';

interface ConfigProps {
  item: ServerData;
}

const ServerConfig: React.FC<ConfigProps> = ({item}) => {
  const {colors} = useTheme();
  const {translations} = useContext(LocalizationContext);
  const [state] = useRaceContext();
  const {layouts} = state.r3e_data;
  const {session} = useRaceSession(item.CurrentSession);

  const style = StyleSheet.create({
    root: {
      backgroundColor: colors.primary,
      margin: 5,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingVertical: 5,
    },
  });
  return (
    <Card style={style.root} elevation={3}>
      <Card.Content style={style.content}>
        <TextContainer
          title={translations.raceDetails.layout}
          text={layouts[item.Settings.TrackLayoutId[0]].Name}
        />
      </Card.Content>
      <Card.Content style={style.content}>
        <TextContainer
          title={translations.raceDetails.session}
          text={session}
        />
        <TextContainer
          title={translations.raceDetails.time}
          text={
            <CountDown
              until={item.TimeLeft / 1000}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{m: null, s: null}}
              size={15}
            />
          }
        />
      </Card.Content>
      <Card.Content style={style.content}>
        <TextContainer
          title={'P'}
          text={item.Settings.PracticeDuration + ' min'}
        />
        <TextContainer
          title={'Q'}
          text={item.Settings.QualifyDuration + ' min'}
        />
        <TextContainer
          title={'R'}
          text={item.Settings.Race1Duration + ' min'}
        />
      </Card.Content>
    </Card>
  );
};

export default ServerConfig;
