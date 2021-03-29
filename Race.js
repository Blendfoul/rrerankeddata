import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CarClass from './CarClass';
import type {Server} from './interfaces/Server';
import {tracks} from './assets/r3e-data.json';
import axios, {CancelTokenSource} from 'axios';
import {fetchTrackImage} from './TrackImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CountDown from 'react-native-countdown-component';
import {styles} from './Theme';

interface Layout {
  Id: Number;
  MaxNumberOfVehicles: Number;
  Name: String;
  Track: Number;
}

const Race: props => Node = props => {
  const serverData: Server.Server = props.data.item.Server;

  const [isLoading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [session, setSession] = useState(null);

  const onRacePress = () => {
    props.navigation.navigate('Race Details', props.data.item);
  };

  useEffect(() => {
    const source: CancelTokenSource = axios.CancelToken.source();

    const getTrackImage = async () => {
      setLoading(true);
      let trackData: Layout;

      for (const track in tracks) {
        if (tracks.hasOwnProperty(track)) {
          const {layouts} = tracks[track];
          trackData = layouts.find(
            (value: Layout) =>
              value.Id === serverData.Settings.TrackLayoutId[0],
          );
          if (trackData !== undefined) {
            break;
          }
        }
      }

      await fetchTrackImage(trackData, source, setImage, setLoading);
    };

    switch (+serverData.CurrentSession) {
      case 0:
        setSession('P');
        break;
      case 256:
        setSession('Q');
        break;
      case 768:
        setSession('R');
        break;
      default:
        setSession('U');
        break;
    }
    getTrackImage();

    return () => source.cancel();
  }, [serverData.CurrentSession, serverData.Settings.TrackLayoutId]);

  return (
    <Pressable onPress={onRacePress}>
      <View
        style={[
          styles.column,
          styles.alignCenter,
          styles.backgroundColor,
          componentStyle.card,
        ]}>
        <View
          style={[
            styles.row,
            styles.alignCenter,
            styles.justifyCenter,
            styles.backgroundColor,
          ]}>
          <View
            style={[
              styles.column,
              styles.justifySpaceBetween,
              styles.alignCenter,
              styles.padding10,
              {flex: 3},
            ]}>
            <Text style={styles.text}>{serverData.Settings.ServerName}</Text>
            <CarClass
              liveries={serverData.Settings.LiveryId}
              size={25}
              imgSize={'thumb'}
            />
          </View>
          {isLoading ? (
            <ActivityIndicator
              color={'#fff'}
              style={[
                styles.column,
                styles.alignCenter,
                styles.justifyCenter,
                componentStyle.logo,
              ]}
            />
          ) : (
            <Image
              style={[
                styles.column,
                styles.alignCenter,
                styles.justifyCenter,
                componentStyle.logo,
              ]}
              source={{
                uri: image.logo,
              }}
            />
          )}
        </View>
        <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
          <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
            <AntDesign name={'team'} color={'#fff'} size={25} />
            <Text style={[styles.text, styles.paddingHorizontal5]}>
              {serverData.PlayersOnServer}
            </Text>
          </View>
          <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
            <AntDesign name={'clockcircleo'} color={'#fff'} size={25} />
            <Text style={[styles.text, styles.paddingHorizontal5]}>
              {session}
            </Text>
          </View>
          <View
            style={[
              styles.row,
              styles.alignCenter,
              styles.justifyCenter,
              {flex: 2},
            ]}>
            <AntDesign name={'hourglass'} color={'#fff'} size={25} />
            <CountDown
              until={serverData.TimeLeft / 1000}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{m: null, s: null}}
              size={10}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const componentStyle = StyleSheet.create({
  card: {
    marginTop: 4,
    marginHorizontal: 8,
    borderRadius: 2,
    paddingVertical: 5,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default Race;
