import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

interface TextContainerProps {
  titleSize?: number;
  textSize?: number;
  icon?: React.ReactElement;
  title: React.ReactElement | string;
  text?: React.ReactElement | string | number;
}

const TextContainer: React.FC<TextContainerProps> = props => {
  const style = StyleSheet.create({
    root: {
      flex: 1,
      marginHorizontal: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: props.titleSize || 15,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      marginTop: Platform.OS === 'ios' ? 10 : undefined,
      fontWeight: 'normal',
      fontSize: props.textSize || 14,
      textAlign: 'center',
    },
    icon: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '100%',
    },
  });

  return (
    <View style={style.root}>
      <View style={style.icon}>
        {props.icon}
        <Text style={[style.title]} testID={'title'}>
          {props.title}
        </Text>
      </View>
      <Text style={style.text} testID={'text'}>
        {props.text}
      </Text>
    </View>
  );
};

export default TextContainer;
