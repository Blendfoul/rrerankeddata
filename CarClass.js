import React, {useEffect, useState} from 'react';
import {cars} from './assets/r3e-data.json';
import {Image, StyleSheet, View} from 'react-native';

const CarClass = props => {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    if (props.classes !== undefined) {
      setClasses(props.classes);
    } else {
      const liveryArray = props.liveries;
      const classAvailable = new Set();
      liveryArray.forEach(value => {
        for (const key in cars) {
          if (cars.hasOwnProperty(key)) {
            const data = cars[key].liveries.find(val => value === val.Id);
            if (data !== undefined) {
              classAvailable.add(data.Class);
            }
          }
        }
      });

      setClasses([...classAvailable]);
    }
  }, [props.classes, props.liveries]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: props.size,
      height: props.size,
    },
  });

  return (
    <View style={styles.container}>
      {classes.map((id: Number, index: Number) => (
        <Image
          source={{
            uri: `https://game.raceroom.com/store/image_redirect?id=${id}&amp;size=${props.imgSize}`,
          }}
          style={styles.image}
          key={index}
        />
      ))}
    </View>
  );
};

export default CarClass;
