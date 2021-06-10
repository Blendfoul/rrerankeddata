import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Image} from 'react-native';
import Logo from '../../assets/logos/Logo';
import Banner from '../../assets/banners/Banner';
import {useRaceContext} from '../../store/RaceContext';

interface Layout {
  Id: number;
  MaxNumberOfVehicles: number;
  Name: string;
  Track: number;
}

interface TrackImageProps {
  logo?: boolean;
  size?: number;
  trackId: number;
  logoImage?: number;
}

const TrackImageComponent: React.FC<TrackImageProps> = props => {
  const [state] = useRaceContext();
  const {tracks} = state.r3e_data;
  const [image, setImage] = useState({
    Track: 0,
    MaxNumberOfVehicles: 0,
    Name: '',
    Id: 0,
  } as Layout);

  const componentStyle = StyleSheet.create({
    image: {
      height: 125,
      resizeMode: 'cover',
      backgroundColor: '#2f2f2f',
    },
    backgroundContainer: {
      width: '100%',
      height: 125,
      overflow: 'hidden',
    },
    logo: {
      marginTop: props.logo ? 0 : 25,
      marginStart: props.logo ? 0 : 25,
      backgroundColor: props.logoImage ? 'transparent' : 'white',
      padding: 10,
      width: props.size || 75,
      height: props.size || 75,
    },
  });

  useEffect(() => {
    let trackData: Layout | undefined;

    for (const track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        //@ts-ignore
        const {layouts} = tracks[track] as Track;

        trackData = layouts.find((value: Layout) => value.Id === props.trackId);
        if (trackData !== undefined) {
          break;
        }
      }
    }

    setImage(trackData as Layout);
  }, [props.trackId, tracks]);

  return props.logo ? (
    <Image style={componentStyle.logo} source={Logo(image.Track)} />
  ) : (
    <>
      <ImageBackground
        style={componentStyle.backgroundContainer}
        source={Banner(image.Track)}>
        <Image
          style={componentStyle.logo}
          source={
            props.logoImage
              ? {
                  uri: `https://game.raceroom.com/store/image_redirect?id=${props.logoImage}&amp;size=small`,
                }
              : Logo(image.Track)
          }
        />
      </ImageBackground>
    </>
  );
};

const TrackImage = React.memo(TrackImageComponent);

export default TrackImage;
