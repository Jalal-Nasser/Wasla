import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar.json';
import en from './locales/en.json';

// i18n configuration for Arabic (RTL) and English (LTR)
i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    lng: 'ar', // Default language is Arabic
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
