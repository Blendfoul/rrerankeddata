import React from 'react';
import { SvgUri } from 'react-native-svg';
import { View } from 'react-native';

type Props = {
  country: string;
  size: number;
};

const Country: React.FC<Props> = ({ country, size }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        marginRight: 10,
      }}>
      <SvgUri
        width={'100%'}
        height={'100%'}
        viewBox="0 0 512.35413 450.45941"
        uri={`https://prod.r3eassets.com/static/img/flags/${country.toLowerCase()}.svg`}
      />
    </View>
  );
};

export default Country;
