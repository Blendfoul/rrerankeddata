import React from 'react';
import {Incident, RaceResult} from '../../models/data/Result';
import useSectorTimes from '../../hooks/useSectorTimes';
import {useTranslation} from 'react-i18next';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {Caption, Card, Paragraph} from 'react-native-paper';
import CustomCardCover from '../shared/CustomCardCover';

type Props = {
  data: RaceResult;
};

const Details: React.FC<Props> = ({data}) => {
  const {lapTime} = useSectorTimes(data.Laps);
  const {t} = useTranslation();

  const renderIncidents: ListRenderItem<Incident> = ({item}) => {
    return (
      <View style={styles.incidentContainer}>
        <Paragraph>{t(`result.incidents.${item.Type}`)}</Paragraph>
        <Caption>{item.Count}x</Caption>
      </View>
    );
  };

  return (
    <Card style={styles.root}>
      <CustomCardCover
        source={{
          uri: `https://game.raceroom.com/store/image_redirect?id=${data.LiveryId.Id}`,
        }}
        resizeMode={'contain'}
      />
      <Card.Title
        title={data.FullName}
        subtitle={data.Team || t('driver.card.privateer')}
      />
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>{t('result.position')}</Paragraph>
          <Caption>{data.FinishPositionInClass}</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>{t('result.laptime')}</Paragraph>
          <Caption>{lapTime}</Caption>
        </View>
      </Card.Content>
      <Card.Content>
        <FlatList
          data={data.Incidents}
          renderItem={renderIncidents}
          numColumns={2}
          keyExtractor={item => item.Type}
          ListHeaderComponent={() => (
            <Paragraph style={styles.title}>
              {t('result.information.incidents')}
            </Paragraph>
          )}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 5,
    elevation: 3,
  },
  incidentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {alignSelf: 'center'},
  content: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
