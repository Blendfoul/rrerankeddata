import React, { useState } from 'react';
import { Card, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { ratingSelector } from '../../../store/slices/DefaultUser';
import { userRatingSelector } from '../../../store/slices/User';
import { useTranslation } from 'react-i18next';

type Props = {
  type: 'User' | 'Default';
};

const UserPlot: React.FC<Props> = ({ type }) => {
  const { colors } = useTheme();
  const [width, setWidth] = useState<number>(0);
  const { data, isLoading } = useSelector(
    type === 'User' ? userRatingSelector : ratingSelector,
  );
  const { t } = useTranslation();

  if (isLoading) {
    return null;
  }

  if (!data.rating.length && !data.reputation.length) {
    return null;
  }

  return (
    <>
      <Card
        style={styles.root}
        onLayout={event => setWidth(event.nativeEvent.layout.width)}>
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                data: data.rating,
              },
            ],
            legend: [t('driver.plot.rating')],
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
      <Card style={styles.root}>
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                data: data.reputation,
              },
            ],
            legend: [t('driver.plot.reputation')],
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

const styles = StyleSheet.create({
  root: {
    margin: 5,
    elevation: 3,
  },
});

export default UserPlot;
