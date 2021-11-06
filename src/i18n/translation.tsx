import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import nl from './locales/nl.json';
import pt from './locales/pt.json';
import pl from './locales/pl.json';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (arg0: string) => any) => {
    return callback(RNLocalize.getLocales()[0].languageCode);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
      de: {
        translation: de,
      },
      it: {
        translation: it,
      },
      fr: {
        translation: fr,
      },
      nl: {
        translation: nl,
      },
      pt: {
        translation: pt,
      },
      pl: {
        translation: pl,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
