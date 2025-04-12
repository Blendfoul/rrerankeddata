import React from 'react';

import { Image, ScrollView, useWindowDimensions } from 'react-native';

const CalendarComponent: React.FC = () => {
  const { height } = useWindowDimensions();

  return (
    <ScrollView horizontal>
      <Image
        source={{
          uri: `https://evosupport.raceroom.com/index.php/apps/files_sharing/publicpreview/xgT5EjNqkiiM8C3?x=1920&y=1080&a=true&file=schedule%2520post.png&scalingup=0&date=${Date.now()}`,
        }}
        resizeMode="contain"
        style={{
          width: 1080,
          height: height - 150,
        }}
      />
    </ScrollView>
  );
};

export default CalendarComponent;
