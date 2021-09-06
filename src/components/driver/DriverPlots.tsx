import React, {useCallback, useEffect, useState} from 'react';
import axiosInstanceGenerator from '../../hooks/useAxiosMock';
import {CareerProfile} from '../../types/careerProfile';
import {Card, useTheme} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions, StyleSheet} from 'react-native';

const DriverPlots: React.FC<{data: number}> = ({data}) => {
  const [ratingData, setRatingData] = useState<number[]>([]);
  const [reputationData, setReputationData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {colors} = useTheme();
  const [width, setWidth] = useState<number>(0);

  const style = StyleSheet.create({
    root: {

      margin: 5,
    },
    content: {
      display: 'flex',
      width: '100%',
      paddingVertical: 0,
    },
  });

  const getRankedData = useCallback(async () => {
    try {
      const response = await axiosInstanceGenerator(
        `users/${data}/career?json`,
      );

      const {Entries} = (response.data.context.c as CareerProfile).raceList
        .GetUserMpRatingProgressResult;

      setRatingData(Entries.map(value => value.RatingAfter));
      setReputationData(Entries.map(value => value.ReputationAfter));
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    getRankedData();
  }, [getRankedData]);

  if (loading) {
    return null;
  }

  return (
    <>
      <Card
        style={style.root}
        onLayout={event => setWidth(event.nativeEvent.layout.width)}>
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                data: ratingData,
              },
            ],
            legend: ['Rating'],
          }}
          height={200}
          width={width - 10}
          withVerticalLabels={false}
          withDots={false}
          bezier
          chartConfig={{
            backgroundGradientFrom: colors.background,
            backgroundGradientFromOpacity: 0,
            decimalPlaces: 0,
            backgroundGradientTo: colors.background,
            backgroundGradientToOpacity: 0,
            color: () => colors.text,
            propsForBackgroundLines: {
              strokeWidth: 0,
            },
          }}
        />
      </Card>
      <Card
        style={style.root}
        onLayout={event => setWidth(event.nativeEvent.layout.width)}>
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                data: reputationData,
              },
            ],
            legend: ['Reputation'],
          }}
          height={200}
          width={width - 10}
          withVerticalLabels={false}
          withDots={false}
          bezier
          chartConfig={{
            backgroundGradientFrom: colors.background,
            backgroundGradientFromOpacity: 0,
            decimalPlaces: 0,
            backgroundGradientTo: colors.background,
            backgroundGradientToOpacity: 0,
            color: () => colors.text,
            propsForBackgroundLines: {
              strokeWidth: 0,
            },
          }}
        />
      </Card>
    </>
  );
};

export default DriverPlots;
