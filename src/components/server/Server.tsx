import React from 'react';
import {Caption, Card, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ServerRoutes,
  ServerStackList,
} from '../../models/navigation/Navigation';
import {useNavigation} from '@react-navigation/core';
import useTrack from '../../hooks/useTrack';
import {RankedServer} from '../../models/data/Ranked';
import CountDown from 'react-native-countdown-component';
import useSession from '../../hooks/useSession';
import CarClass from '../shared/CarClass';
import ContentImage from '../shared/ContentImage';
import FastImage from 'react-native-fast-image';
import CustomCardCover from '../shared/CustomCardCover';
import useRaceType from '../../hooks/useRaceType';
import AntIcon from 'react-native-vector-icons/AntDesign';
import useServerColor from '../../hooks/useServerColor';

type Props = {
  data: RankedServer;
  option?: boolean;
};

type NavigationProps = NativeStackNavigationProp<
  ServerStackList,
  ServerRoutes.HOME
>;

const Server: React.FC<Props> = ({data, option = false}) => {
  const {navigate} = useNavigation<NavigationProps>();
  const {Server: server} = data;
  const {trackInfo, layout} = useTrack(server.Settings.TrackLayoutId[0]);
  const {session} = useSession(server.CurrentSession);
  const {name, raceType} = useRaceType(data.Server.Settings);
  const {colors} = useTheme();
  const {color} = useServerColor(data.Server.Settings, data.Server.Players);

  const countdown = {
    backgroundColor: colors.text === '#fff' ? '#000' : '#fff',
  };

  const navigateToServer = () => {
    navigate({
      name: ServerRoutes.SERVER,
      params: {
        id: server.Settings.ServerName,
      },
    });
  };

  return (
    <Card
      style={[
        styles.root,
        color !== undefined ? {backgroundColor: color} : undefined,
      ]}
      onPress={navigateToServer}>
      <CustomCardCover
        resizeMode={'cover'}
        source={{
          uri: `https://game.raceroom.com/store/image_redirect?id=${trackInfo.Id}&amp;size=big`,
        }}
        style={styles.cover}>
        <View style={styles.imgContainer}>
          <CarClass data={server.Settings.LiveryId} />
          <FastImage
            source={raceType.image}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.img}
          />
        </View>
      </CustomCardCover>
      <Card.Title
        title={option ? trackInfo.Name : name}
        right={() => (
          <ContentImage
            itemId={layout.Id}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.layout}
          />
        )}
        subtitle={layout.Name}
        left={props => (
          <ContentImage
            source={{
              uri: `https://prod.r3eassets.com/assets/content/track/${trackInfo.Name.toLowerCase()
                .replaceAll(' ', '-')
                .replace('ü', 'u')}-${trackInfo.Id}-logo-original.webp`,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              height: props.size,
              width: props.size,
              backgroundColor: 'white',
            }}
          />
        )}
      />
      <Card.Content style={styles.container}>
        <View style={styles.captionContainer}>
          <AntIcon
            name={'car'}
            size={25}
            style={styles.padRight}
            color={colors.placeholder}
          />
          <Caption>{server.PlayersOnServer}</Caption>
        </View>
        <View style={styles.captionContainer}>
          <Caption>{session}</Caption>
        </View>
        <View>
          <CountDown
            until={server.TimeLeft / 1000}
            timeToShow={['H', 'M', 'S']}
            digitStyle={countdown}
            timeLabels={{m: undefined, s: undefined}}
            size={10}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 5,
  },
  layout: {
    width: 75,
    height: 75,
  },
  cover: {
    height: 125,
    justifyContent: 'flex-end',
  },
  class: {
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    width: 75,
    height: 30,
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  captionContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  padRight: {
    paddingRight: 5,
  },
});

export default Server;
