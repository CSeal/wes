import * as i18next from 'i18next';
import * as i18nXHR from 'i18next-xhr-backend';
import * as LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

export const i18n = i18next.use(LanguageDetector).use(reactI18nextModule).use(i18nXHR).init({
  fallbackLng: 'en',
  whitelist: ['en', 'de', 'ru'],
  preload: ['en'],
  ns: 'common',
  defaultNS: 'common',
  fallbackNS: false,
  debug: false,
  // TODO: get back autodetection !
  // detection: {
  //   order: ['querystring', 'navigator', 'htmlTag'],
  //   lookupQuerystring: 'lang',
  // },
  backend: {
    loadPath: '/frontend/locales/{{lng}}/{{ns}}.json',
  },
});

export default i18n;
