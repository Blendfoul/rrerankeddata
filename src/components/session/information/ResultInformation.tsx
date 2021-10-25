import React from 'react';
import {Result} from '../../../models/data/User';
import {Caption, Card, Paragraph} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ContentImage from '../../shared/ContentImage';
import FastImage from 'react-native-fast-image';

type Props = {
  data: Result;
};

const ResultInformation: React.FC<Props> = ({data}) => {
  const {t} = useTranslation();

  return (
    <Card style={styles.root}>
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <Paragraph>{t('session.StartPosition')}</Paragraph>
          <Caption>{data.StartPositionInClass}</Caption>
        </View>
        <View style={styles.container}>
          <View style={styles.content}>
            <Paragraph>{t('session.FinishPosition')}</Paragraph>
            {data.FinishPositionInClass !== data.StartPositionInClass ? (
              <Icon
                name={
                  data.StartPositionInClass > data.FinishPositionInClass
                    ? 'chevron-double-up'
                    : 'chevron-double-down'
                }
                size={25}
                color={
                  data.StartPositionInClass > data.FinishPositionInClass
                    ? 'green'
                    : 'red'
                }
              />
            ) : null}
          </View>
          <Caption>{data.FinishPositionInClass}</Caption>
        </View>
        <View />
      </Card.Content>
      <Card.Content style={styles.content}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Paragraph>{t('session.RatingAfter')}</Paragraph>
            <Icon
              name={
                data.RatingChange >= 0
                  ? 'chevron-double-up'
                  : 'chevron-double-down'
              }
              size={25}
              color={data.RatingChange >= 0 ? 'green' : 'red'}
            />
          </View>
          <Caption>{data.RatingAfter}</Caption>
        </View>
        <View style={styles.container}>
          <View style={styles.content}>
            <Paragraph>{t('session.ReputationAfter')}</Paragraph>
            <Icon
              name={
                data.ReputationChange >= 0
                  ? 'chevron-double-up'
                  : 'chevron-double-down'
              }
              size={25}
              color={data.ReputationChange >= 0 ? 'green' : 'red'}
            />
          </View>
          <Caption>{data.ReputationAfter}</Caption>
        </View>
      </Card.Content>
      <Card.Content style={styles.imgContainer}>
        <ContentImage
          itemId={data.LiveryId.Id}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.img}
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
  content: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 320,
    height: 180,
  },
});

export default ResultInformation;
