import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import nl from './locales/nl.json';
import pt from './locales/pt.json';

i18n.use(initReactI18next).init({
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
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
