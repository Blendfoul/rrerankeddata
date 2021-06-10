import React, {createContext, useState} from 'react';
import translations, {DEFAULT_LANGUAGE} from './Translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import {Translations} from '../../types/translations';

const APP_LANGUAGE = 'appLanguage';

interface TranslationContext {
  translations: Translations;
  setAppLanguage: (value: string) => Promise<void>;
  appLanguage: string;
  initializeAppLanguage: () => Promise<string>;
}

export const LocalizationContext = createContext({
  translations,
  setAppLanguage: async () => {
    return Promise.resolve(undefined as void);
  },
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: async (): Promise<string> => {
    return Promise.resolve('');
  },
} as TranslationContext);

export const LocalizationProvider: React.FC = ({children}) => {
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

  const setLanguage = async (language: string) => {
    translations.setLanguage(language);
    setAppLanguage(language);
    await AsyncStorage.setItem(APP_LANGUAGE, language);
  };

  const initializeAppLanguage = async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);

    if (!currentLanguage) {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode,
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      await setLanguage(localeCode);
      return localeCode;
    } else {
      await setLanguage(currentLanguage);
      return currentLanguage;
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};
