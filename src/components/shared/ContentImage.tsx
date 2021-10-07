import React from 'react';
import FastImage, {
  ImageStyle,
  ResizeMode,
  Source,
} from 'react-native-fast-image';
import {StyleProp} from 'react-native';

interface Props {
  itemId?: number;
  source?: Source | number;
  resizeMode?: ResizeMode;
  style?: StyleProp<ImageStyle>;
}

const ContentImage: React.FC<Props> = ({itemId, source, ...props}) => (
  <FastImage
    {...props}
    source={
      !source
        ? {
            uri: `https://game.raceroom.com/store/image_redirect?id=${itemId}`,
          }
        : source
    }
  />
);

export default ContentImage;
