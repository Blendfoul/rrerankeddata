import React, {useContext} from 'react';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Subheading, useTheme} from 'react-native-paper';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

const EmptyRaceComponent: React.FC = () => {
  const {translations} = useContext(LocalizationContext);
  const {colors} = useTheme();

  const style = StyleSheet.create({
    root: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: Dimensions.get('window').height * 0.6,
    },
    text: {
      color: colors.text,
    },
    image: {
      width: Dimensions.get('window').width * 0.85,
    },
  });

  return (
    <View style={style.root}>
      <Image
        source={require('../../assets/nosServers.png')}
        resizeMode={'contain'}
        resizeMethod={'scale'}
        style={style.image}
      />
      <Subheading style={style.text}>{translations.noServers}</Subheading>
    </View>
  );
};

export default EmptyRaceComponent;
