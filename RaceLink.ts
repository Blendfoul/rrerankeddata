import {LinkingOptions} from '@react-navigation/native';

const config = {
  screens: {
    Servers: 'servers',
    Search: {
      path: 'users/:id',
      parse: {
        id: (id: string) => `${id}`,
      },
    },
  },
};

const RaceLink: LinkingOptions = {
  prefixes: [
    'https://game.raceroom.com/',
    'r3estats://',
    'https://raceroom.dhsh.tk/',
  ],
  config,
  enabled: true,
};

export default RaceLink;
