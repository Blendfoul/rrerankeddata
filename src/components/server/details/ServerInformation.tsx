import React from 'react';
import {RankedServer} from '../../../models/data/Ranked';
import {Caption, Card, Paragraph} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import useSof from '../../../hooks/useSof';
import {useTranslation} from 'react-i18next';

type Props = {
  data: RankedServer;
};

const ServerInformation: React.FC<Props> = ({data}) => {
  const {t} = useTranslation();
  const {sof, rep} = useSof(data.Server.Players);
  const {PracticeDuration, QualifyDuration, Race1Duration} =
    data.Server.Settings;

  return (
    <Card style={styles.root}>
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>{t('server.field')}</Paragraph>
          <Caption>{sof}</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('server.reputation')}</Paragraph>
          <Caption style={{flex: 1}}>{rep}</Caption>
        </View>
      </Card.Content>
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>{t('server.session.practice')}</Paragraph>
          <Caption>{PracticeDuration} min</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('server.session.qualification')}</Paragraph>
          <Caption>{QualifyDuration} min</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('server.session.race')}</Paragraph>
          <Caption>{Race1Duration} min</Caption>
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

export default ServerInformation;
