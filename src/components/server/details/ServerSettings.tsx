import React from 'react';
import {RankedServer} from '../../../models/data/Ranked';
import {Caption, Card, Paragraph} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  data: RankedServer;
};

const ServerSettings: React.FC<Props> = ({data}) => {
  const {t} = useTranslation();
  const {FuelUsage, TireWear, MandatoryPitStop, CutRules} =
    data.Server.Settings;

  return (
    <Card style={styles.root}>
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>{t('raceDetails.tireWear')}</Paragraph>
          <Caption>{TireWear}x</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('raceDetails.fuel')}</Paragraph>
          <Caption>{FuelUsage}x</Caption>
        </View>
      </Card.Content>
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>{t('raceDetails.mandatoryPit')}</Paragraph>
          <Caption>
            {MandatoryPitStop
              ? t('raceDetails.enabled')
              : t('raceDetails.disabled')}
          </Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('raceDetails.cutRules')}</Paragraph>
          <Caption>{CutRules}</Caption>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 5,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServerSettings;
