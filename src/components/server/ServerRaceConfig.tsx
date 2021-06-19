import React, {useContext} from 'react';
import {ServerData} from '../../types/server';
import {Card, useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import TextContainer from '../utils/TextContainer';
import {LocalizationContext} from '../translations/LocalizationContext';

interface ConfigProps {
  item: ServerData;
}

const ServerRaceConfig: React.FC<ConfigProps> = ({item}) => {
  const {colors} = useTheme();
  const {translations} = useContext(LocalizationContext);

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
    <Card style={style.root}>
      <Card.Content style={style.content}>
        <TextContainer
          title={translations.raceDetails.tireWear}
          text={item.Settings.TireWear + 'x'}
        />
        <TextContainer
          title={translations.raceDetails.fuel}
          text={item.Settings.FuelUsage + 'x'}
        />
      </Card.Content>
      <Card.Content style={style.content}>
        <TextContainer
          title={translations.raceDetails.mandatoryPit}
          text={
            item.Settings.MandatoryPitStop
              ? translations.raceDetails.enabled
              : translations.raceDetails.disabled
          }
        />
        <TextContainer
          title={translations.raceDetails.cutRules}
          text={'Slow Down'}
        />
      </Card.Content>
    </Card>
  );
};

export default ServerRaceConfig;
