import React from 'react';
import {useRoute} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SessionTabStackList} from '../../models/navigation/Navigation';
import {useSelector} from 'react-redux';
import {resultSelector} from '../../store/slices/User';
import {Caption, Card, Paragraph} from 'react-native-paper';
import useTrack from '../../hooks/useTrack';
import {ScrollView, StyleSheet, View} from 'react-native';
import ResultCover from '../shared/ResultCover';
import ContentImage from '../shared/ContentImage';
import FastImage from 'react-native-fast-image';
import ResultInformation from './information/ResultInformation';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<SessionTabStackList, 'Info'>['route'];

const SessionInformation: React.FC = () => {
  const {t} = useTranslation();
  const {params} = useRoute<Props>();
  const data = useSelector(resultSelector(params.hash));
  const {trackInfo} = useTrack(data.TrackLayoutId.Id);
  const classes = data.CarClasses.map(c => c.Id);
  const timeFinish = new Date(data.RaceFinishTime * 1000);

  return (
    <ScrollView>
      <Card style={styles.root}>
        <ResultCover trackInfo={trackInfo} classes={classes} />
        <Card.Title
          title={trackInfo.Name}
          subtitle={timeFinish.toLocaleString()}
          right={() => (
            <ContentImage
              itemId={data.TrackLayoutId.Id}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.img}
            />
          )}
        />
        <Card.Content style={styles.content}>
          <View style={styles.container}>
            <Paragraph>{t('session.Incidents')}</Paragraph>
            <Caption>{data.IncidentPoints}</Caption>
          </View>
          <View style={styles.container}>
            <Paragraph>{t('session.Drivers')}</Paragraph>
            <Caption>{data.PlayersCount}</Caption>
          </View>
        </Card.Content>
      </Card>
      <ResultInformation data={data} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 5,
    elevation: 3,
  },
  img: {
    width: 100,
    height: 100,
  },
  content: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SessionInformation;
