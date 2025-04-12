import React from 'react';

import { Image, ImageSourcePropType, ImageResizeMode, StyleProp, ImageStyle } from 'react-native';

interface Props {
  itemId?: number;
  source?: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
  style?: StyleProp<ImageStyle>;
}

const ContentImage: React.FC<Props> = ({ itemId, source, ...props }) => {
  const parsedSource: ImageSourcePropType = !source ? {
    uri: `https://game.raceroom.com/store/image_redirect?id=${itemId}`,
  } : source;

  return (
    <Image
      {...props}
      source={parsedSource} />
  );
};

export default ContentImage;
