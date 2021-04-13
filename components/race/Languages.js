import Flag from 'react-native-flags';
import React from 'react';

const Languages = [
  {
    label: '',
    value: 'en',
    icon: () => <Flag code={'GB'} size={32} type={'flat'} />,
  },
  {
    label: '',
    value: 'pt',
    icon: () => <Flag code={'PT'} size={32} type={'flat'} />,
  },
  {
    label: '',
    value: 'de',
    icon: () => <Flag code={'DE'} size={32} type={'flat'} />,
  },
  {
    label: '',
    value: 'nl',
    icon: () => <Flag code={'NL'} size={32} type={'flat'} />,
  },
  {
    label: '',
    value: 'es',
    icon: () => <Flag code={'ES'} size={32} type={'flat'} />,
  },
];

export default Languages;
