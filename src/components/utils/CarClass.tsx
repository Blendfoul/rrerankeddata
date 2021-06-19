import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import useCarClass from '../../hooks/useCarClass';

interface CarClassProps {
  classId?: number[];
  liveries?: number[];
  size?: number;
  imgSize?: string;
}

const CarClassComponent: React.FC<CarClassProps> = ({
  classId,
  liveries,
  size,
  imgSize,
}) => {
  const {classes} = useCarClass(classId, liveries);

  const componentStyle = StyleSheet.create({
    image: {
      width: size,
      height: size,
    },
    root: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 5,
    },
  });

  return (
    <View style={componentStyle.root}>
      {classes.map((id: number, index: number) => (
        <Image
          source={{
            uri: `https://game.raceroom.com/store/image_redirect?id=${id}&amp;size=${imgSize}`,
          }}
          style={componentStyle.image}
          key={`class- ${index}`}
        />
      ))}
    </View>
  );
};

const CarClass = React.memo(CarClassComponent);

export default CarClass;
