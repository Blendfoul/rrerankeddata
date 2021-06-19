import React, {useContext} from 'react';
import {Card, useTheme} from 'react-native-paper';
import TrackImage from '../utils/TrackImage';
import useServerSof from '../../hooks/useServerSof';
import CarClass from '../utils/CarClass';
import TextContainer from '../utils/TextContainer';
import {LocalizationContext} from '../translations/LocalizationContext';
import {StyleSheet, View} from 'react-native';
import {ServerData} from '../../types/server';

interface CoverProps {
  item: ServerData;
}

const ServerCover: React.FC<CoverProps> = ({item}) => {
  const {translations} = useContext(LocalizationContext);
  const {sof, rep, loading} = useServerSof(item.Players);
  const {colors} = useTheme();

  const style = StyleSheet.create({
    root: {
      backgroundColor: colors.primary,
      margin: 5,
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: 5,
    },
  });

  if (loading) {
    return null;
  }

  return (
    <Card style={style.root} elevation={3}>
      <TrackImage trackId={item.Settings.TrackLayoutId[0]} />
      <Card.Content>
        <CarClass
          liveries={item.Settings.LiveryId}
          size={40}
          imgSize={'small'}
        />
        <View style={style.container}>
          <TextContainer
            title={translations.raceDetails.players}
            text={item.PlayersOnServer}
          />
          <TextContainer
            title={translations.raceDetails.sof}
            text={sof.toFixed(3)}
          />
          <TextContainer
            title={translations.raceDetails.reputation}
            text={rep.toFixed(3)}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default ServerCover;
