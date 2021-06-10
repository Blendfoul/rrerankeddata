import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {styles} from './Theme';
import useCarClass from '../../hooks/useCarClass';

interface CarClassProps {
  classId?: number[];
  liveries?: number[];
  size?: number;
  imgSize?: string;
}

const CarClass: React.FC<CarClassProps> = ({
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
  });

  console.log(classes);
  return (
    <View style={[styles.row, styles.justifyCenter]}>
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

export default CarClass;
