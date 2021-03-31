import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {tracks} from './assets/r3e-data.json';
import Logo from './assets/logos/Logo';
import Banner from './assets/banners/Banner';
import {Image} from 'react-native-elements';
import {styles} from './Theme';

interface Layout {
  Id: Number;
  MaxNumberOfVehicles: Number;
  Name: String;
  Track: Number;
}

const TrackImage = props => {
  const [image, setImage] = useState({Track: 0});

  useEffect(() => {
    let trackData: Layout;

    for (const track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        const {layouts} = tracks[track];

        trackData = layouts.find((value: Layout) => value.Id === props.trackId);
        if (trackData !== undefined) {
          break;
        }
      }
    }

    setImage(trackData);
  }, [props.trackId]);
  return (
    <View>
      <ImageBackground
        style={componentStyle.backgroundContainer}
        source={Banner(image.Track)}
        placeholderStyle={styles.backgroundColor}
        PlaceholderContent={<ActivityIndicator color={'#fff'} />}>
        <Image
          style={componentStyle.logo}
          source={Logo(image.Track)}
          placeholderStyle={styles.backgroundColor}
          PlaceholderContent={<ActivityIndicator color={'#fff'} />}
        />
      </ImageBackground>
    </View>
  );
};

const componentStyle = StyleSheet.create({
  image: {
    height: 125,
    resizeMode: 'contain',
    backgroundColor: '#2f2f2f',
  },
  backgroundContainer: {
    width: Dimensions.get('window').width,
    height: 125,
  },
  logo: {
    marginTop: 25,
    marginStart: 25,
    backgroundColor: 'rgba(0,0,0,0)',
    width: 75,
    height: 75,
  },
});

export default TrackImage;
