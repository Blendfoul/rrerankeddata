import React from 'react';
import useCarClass from '../../hooks/useCarClass';
import { FlatList, Image, ListRenderItem, StyleSheet } from 'react-native';

type Props = {
  data?: number[];
  classId?: number[];
};

const styles = StyleSheet.create({
  icon: {
    height: 35,
    width: 35,
  },
});

const CarClass: React.FC<Props> = ({ data, classId, ...props }) => {
  const { classes } = useCarClass(classId, data);

  const renderItem: ListRenderItem<number> = ({ item }) => (
    <Image
      source={{
        uri: `https://game.raceroom.com/store/image_redirect?id=${item}`,
      }}
      resizeMode={'contain'}
      style={styles.icon}
    />
  );

  return (
    <FlatList {...props} horizontal data={classes} renderItem={renderItem} />
  );
};

export default CarClass;
