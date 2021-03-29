import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TextContainer = props => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 15,
      flexDirection: 'column',
      justifyContent: props.align || 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: props.titleSize || 15,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: props.titleAlign || 'center',
    },
    text: {
      fontSize: props.textSize || 14,
      color: '#fff',
      textAlign: props.textAlign || 'center',
    },
  });

  return (
    <View style={style.container}>
      <Text style={[style.title, props.style]}>
        {props.icon} {props.title}
      </Text>
      <Text style={style.text}>{props.text}</Text>
    </View>
  );
};

export default TextContainer;
