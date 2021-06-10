import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: require('./values/en.json'),
  pt: require('./values/pt.json'),
  de: require('./values/de.json'),
  nl: require('./values/nl.json'),
  es: require('./values/es.json'),
  it: require('./values/it.json'),
  fr: require('./values/fr.json'),
};

export default new LocalizedStrings(translations);
