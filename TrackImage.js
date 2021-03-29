import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import axios, {CancelTokenSource} from 'axios';
import {tracks} from './assets/r3e-data.json';

interface Layout {
  Id: Number;
  MaxNumberOfVehicles: Number;
  Name: String;
  Track: Number;
}

export async function fetchTrackImage(trackData, source, setImage, setLoading) {
  try {
    const response = await axios(
      'https://game.raceroom.com/store/tracks/all/' +
        tracks[trackData.Track].Name.replace(/ /g, '-')
          .replace(/ü/g, 'u')
          .toLowerCase() +
        '?json',
      {cancelToken: source.token},
    );

    if (response.status === 200) {
      setImage(response.data.context.c.item.image);
      setLoading(false);
    }
  } catch (e) {
    console.error('[Track Image] ' + e.message);
  }
}

const TrackImage = props => {
  const [isLoading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const source: CancelTokenSource = axios.CancelToken.source();
    const getTrackImage = async () => {
      setLoading(true);
      let trackData: Layout;

      for (const track in tracks) {
        if (tracks.hasOwnProperty(track)) {
          const {layouts} = tracks[track];

          trackData = layouts.find(
            (value: Layout) => value.Id === props.trackId,
          );
          if (trackData !== undefined) {
            break;
          }
        }
      }

      await fetchTrackImage(trackData, source, setImage, setLoading);
    };

    getTrackImage();

    return () => {
      source.cancel('Image fetching cancelled');
    };
  }, [props.trackId]);

  return isLoading ? (
    <ActivityIndicator
      size="large"
      style={componentStyle.image}
      color={'#fff'}
    />
  ) : (
    <View>
      <ImageBackground
        style={componentStyle.backgroundContainer}
        source={{
          uri: image.thumb,
        }}>
        <Image
          style={componentStyle.logo}
          source={{
            uri: image.logo,
          }}
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
