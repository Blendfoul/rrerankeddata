import React from 'react';
import {StyleSheet, Image, ImageBackground} from 'react-native';
import Logo from '../../assets/logos/Logo';
import Banner from '../../assets/banners/Banner';
import useTrackInfo from '../../hooks/useTrackInfo';
import {Card} from 'react-native-paper';

interface TrackImageProps {
  type?: 'logo' | 'background';
  size?: number;
  layoutId: number;
}

const TrackImageComponent: React.FC<TrackImageProps> = props => {
  const {layout} = useTrackInfo(props.layoutId);

  const componentStyle = StyleSheet.create({
    backgroundContainer: {
      display: 'flex',
      flex: 1,
      height: 125,
      overflow: 'hidden',
    },
    logo: {
      backgroundColor: 'white',
      padding: 10,
      width: props.size || 75,
      height: props.size || 75,
    },
    cover: {
      width: '100%',
      height: 130,
    },
    logoMargin: {
      marginTop: 25,
      marginStart: 25,
    },
  });

  switch (props.type) {
    case 'logo':
      return <Image style={componentStyle.logo} source={Logo(layout.Track)} />;
    case 'background':
      return (
        <Card.Cover
          source={Banner(layout.Track)}
          resizeMode={'cover'}
          style={componentStyle.cover}
        />
      );
    default:
      return (
        <React.Fragment>
          <ImageBackground
            style={componentStyle.backgroundContainer}
            source={Banner(layout.Track)}>
            <Image
              style={[componentStyle.logo, componentStyle.logoMargin]}
              source={Logo(layout.Track)}
            />
          </ImageBackground>
        </React.Fragment>
      );
  }
};

const TrackImage = React.memo(TrackImageComponent);

export default TrackImage;
