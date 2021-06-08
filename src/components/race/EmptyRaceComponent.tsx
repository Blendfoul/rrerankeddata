import React, {useContext} from 'react';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Subheading, useTheme} from 'react-native-paper';
import {Dimensions, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

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
  });

  return (
    <View style={style.root}>
      <Icon name={'car'} color={colors.text} size={55} />
      <Subheading style={style.text}>{translations.noServers}</Subheading>
    </View>
  );
};

export default EmptyRaceComponent;
