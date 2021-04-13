import type {Race} from '../../interfaces/Profile';
import React, {useContext} from 'react';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Caption, DataTable, Paragraph} from 'react-native-paper';
import CarClass from '../utils/CarClass';
import TrackImage from '../utils/TrackImage';
import {styles} from '../utils/Theme';
import {StyleSheet, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

const HistoryRow = ({race, navigation}: {race: Race}) => {
  const {translations} = useContext(LocalizationContext);

  const racePress = (raceId: String, trackLayout: Number) => {
    navigation.navigate(translations.navigation.sessionDetails, {
      hash: raceId,
      track: trackLayout,
    });
  };

  return (
    <DataTable.Row onPress={() => racePress(race.RaceHash, race.TrackLayoutId)}>
      <View style={[styles.row, styles.paddingVertical5]}>
        <View style={[styles.column, {flex: 1.2, marginRight: 25}]}>
          <View
            style={[styles.column, styles.alignCenter, styles.justifyEvenly]}>
            <CarClass
              classes={race.CarClasses.map(classes => classes.Id)}
              size={27.5}
              imgSize={'small'}
            />
          </View>
          <View
            style={[
              styles.column,
              styles.alignCenter,
              styles.justifyEvenly,
              {paddingTop: 10},
            ]}>
            <TrackImage logo={true} trackId={race.TrackLayoutId.Id} size={30} />
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <Caption style={componentStyle.caption}>
              <AntIcon name={'user'} size={15} color={'white'} />{' '}
              {race.FinishPositionInClass}
            </Caption>
            <Caption style={componentStyle.caption}>
              <AntIcon name={'team'} size={15} color={'white'} />{' '}
              {race.PlayersCount}
            </Caption>
          </View>
          <View style={[styles.row]}>
            <Paragraph
              style={[
                componentStyle.caption,
                {
                  backgroundColor:
                    race.RatingChange >= 0 ? '#24B533' : '#BB2124',
                  borderTopLeftRadius: 2.5,
                  borderBottomLeftRadius: 2.5,
                  paddingVertical: 5,
                },
              ]}>
              <AntIcon name={'solution1'} size={15} color={'white'} />{' '}
              {race.RatingChange}
            </Paragraph>
            <Paragraph
              style={[
                componentStyle.caption,
                {
                  backgroundColor:
                    race.ReputationChange >= 0 ? '#24B533' : '#BB2124',
                  borderTopRightRadius: 2.5,
                  borderBottomRightRadius: 2.5,
                  paddingVertical: 5,
                },
              ]}>
              <AntIcon name={'exception1'} size={15} color={'white'} />{' '}
              {race.ReputationChange}
            </Paragraph>
          </View>
        </View>
      </View>
    </DataTable.Row>
  );
};

const componentStyle = StyleSheet.create({
  caption: {flex: 1, textAlign: 'center'},
});

export default HistoryRow;
