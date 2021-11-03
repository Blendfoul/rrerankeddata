import React from 'react';
import {useRoute} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UserStackList} from '../models/navigation/Navigation';
import {Caption, Card, Paragraph} from 'react-native-paper';
import CustomCardCover from '../components/shared/CustomCardCover';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {Incident} from '../models/data/Result';
import useSectorTimes from '../hooks/useSectorTimes';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<UserStackList, 'Details'>['route'];

const SessionDetailsScreen: React.FC = () => {
  const {
    params: {data},
  } = useRoute<Props>();
  const {lapTime} = useSectorTimes(data.Laps);
  const {t} = useTranslation();

  const renderIncidents: ListRenderItem<Incident> = ({item}) => {
    return (
      <View style={styles.incidentContainer}>
        <Paragraph>{t(`incidents.${item.Type}`)}</Paragraph>
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
      <Card.Title title={data.FullName} subtitle={data.Team || 'Privateer'} />
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>Position</Paragraph>
          <Caption>{data.FinishPositionInClass}</Caption>
        </View>
        <View style={styles.container}>
          <Paragraph>Lap time</Paragraph>
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
            <Paragraph style={styles.title}>Incidents</Paragraph>
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

export default SessionDetailsScreen;
