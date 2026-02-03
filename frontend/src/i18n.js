import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import locales from './locales'

i18n.use(initReactI18next).init({
  lng: 'ru',
  resources: {
    ru: locales.ru,
    en: locales.en,
  },
  debug: true,
})

export default i18n
