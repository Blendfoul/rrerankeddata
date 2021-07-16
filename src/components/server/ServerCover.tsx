import React, {useContext} from 'react';
import {Card, useTheme} from 'react-native-paper';
import TrackImage from '../utils/TrackImage';
import useServerSof from '../../hooks/useServerSof';
import CarClass from '../utils/CarClass';
import TextContainer from '../utils/TextContainer';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Image, StyleSheet, View} from 'react-native';
import {ServerData} from '../../types/server';
import useTrackInfo from '../../hooks/useTrackInfo';

interface CoverProps {
  item: ServerData;
}

const ServerCover: React.FC<CoverProps> = ({item}) => {
  const {translations} = useContext(LocalizationContext);
  const {sof, rep, loading} = useServerSof(item.Players);
  const {colors} = useTheme();
  const {layout, trackInfo} = useTrackInfo(item.Settings.TrackLayoutId[0]);

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
    image: {
      width: 75,
      height: 75,
    },
    cover: {
      width: '100%',
      height: 130,
    },
  });

  if (loading) {
    return null;
  }

  return (
    <Card style={style.root} elevation={3}>
      <TrackImage layoutId={layout.Id} type={'background'} />
      <Card.Title
        left={props => (
          <TrackImage layoutId={layout.Id} type={'logo'} {...props} />
        )}
        title={trackInfo.Name}
        subtitle={layout.Name}
        right={props => (
          <Image
            source={{
              uri: `https://game.raceroom.com/store/image_redirect?id=${layout.Id}&amp;size=small`,
            }}
            {...props}
            style={style.image}
          />
        )}
      />
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
