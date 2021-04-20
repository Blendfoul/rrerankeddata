import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CarClass from '../utils/CarClass';
import {tracks} from '../../assets/r3e-data.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CountDown from 'react-native-countdown-component';
import {styles} from '../utils/Theme';
import {Image} from 'react-native-elements';
import Logo from '../../assets/logos/Logo';
import {LocalizationContext} from '../translations/LocalizationContext';

interface Layout {
  Id: Number;
  MaxNumberOfVehicles: Number;
  Name: String;
  Track: Number;
}

const Race = ({data, navigation, index}) => {
  const {translations} = useContext(LocalizationContext);
  const [image, setImage] = useState(0);
  const [session, setSession] = useState(null);

  const onRacePress = () => {
    navigation.navigate(
      translations.navigation.raceDetails,
      data.Settings.ServerName,
    );
  };

  useEffect(() => {
    let trackData: Layout;

    for (const track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        const {layouts} = tracks[track];
        trackData = layouts.find(
          (value: Layout) => value.Id === data.Settings.TrackLayoutId[0],
        );
        if (trackData !== undefined) {
          break;
        }
      }
    }

    setImage(trackData);

    switch (+data.CurrentSession) {
      case 0:
        setSession('P');
        break;
      case 256:
        setSession('Q');
        break;
      case 768:
        setSession('R');
        break;
    }
  }, [data.CurrentSession, data.Settings.TrackLayoutId]);

  return (
    <Pressable onPress={onRacePress} style={componentStyle.cardMargin}>
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
              styles.paddingHorizontal10,
              {flex: 3},
            ]}>
            <Text style={styles.text}>{data.Settings.ServerName}</Text>
            <CarClass
              liveries={data.Settings.LiveryId}
              size={25}
              imgSize={'thumb'}
            />
          </View>
          <Image
            style={[
              styles.column,
              styles.alignCenter,
              styles.justifyCenter,
              componentStyle.logo,
            ]}
            PlaceholderContent={<ActivityIndicator color={'#fff'} />}
            placeholderStyle={{backgroundColor: '#2f2f2f'}}
            source={Logo(image.Track)}
          />
        </View>
        <View
          style={[
            styles.row,
            styles.alignCenter,
            styles.justifyCenter,
            styles.paddingVertical5,
          ]}>
          <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
            <AntDesign name={'team'} color={'#fff'} size={25} />
            <Text style={[styles.text, styles.paddingHorizontal5]}>
              {data.PlayersOnServer}
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
              until={data.TimeLeft / 1000}
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
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  cardMargin: {
    marginVertical: 2,
  },
});

export default Race;
