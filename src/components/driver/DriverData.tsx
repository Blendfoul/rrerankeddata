import React, {useContext} from 'react';
import TextContainer from '../utils/TextContainer';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Card, Divider, useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {Driver} from '../../hooks/useDriver';

interface DriverProps {
  data: Driver;
}

const DriverData: React.FC<DriverProps> = ({data}) => {
  const {translations} = useContext(LocalizationContext);
  const {colors} = useTheme();

  const style = StyleSheet.create({
    root: {
      margin: 5,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingVertical: 10,
    },
  });

  return (
    <Card style={style.root} elevation={3}>
      <Card.Content style={style.content}>
        <TextContainer
          titleSize={14}
          title={translations.profile.races}
          text={data.rating.RacesCompleted || 0}
        />
        <Divider />
        <TextContainer
          titleSize={14}
          title={translations.profile.rating}
          icon={<AntIcon name={'solution1'} color={colors.text} />}
          text={data.rating.Rating || 1500}
        />
        <Divider />
        <TextContainer
          titleSize={14}
          title={translations.profile.reputation}
          icon={<AntIcon name={'exception1'} color={colors.text} />}
          text={data.rating.Reputation || 70}
        />
      </Card.Content>
      <Card.Content style={style.content}>
        <TextContainer
          title={translations.profile.lapsCompleted}
          titleSize={14}
          text={
            data.data.overview.basic_statistics[0].value +
            ` ${translations.profile.laps}`
          }
        />
        <TextContainer
          title={translations.profile.distance}
          titleSize={14}
          text={data.data.overview.basic_statistics[1].value}
        />
      </Card.Content>
      <Card.Content style={style.content}>
        <TextContainer
          title={translations.profile.timeInGame}
          titleSize={14}
          text={data.data.overview.basic_statistics[2].value}
        />
        <TextContainer
          titleSize={14}
          title={translations.profile.joined}
          text={data.data.overview.basic_statistics[3].value}
        />
      </Card.Content>
    </Card>
  );
};

export default DriverData;
