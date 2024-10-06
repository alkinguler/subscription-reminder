import i18n from "i18next";
import { initReactI18next } from "node_modules/react-i18next";
import enLocalization from "./en/localization";
import trLocalization from "./tr/localization";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enLocalization,
    },
    tr: {
      translation: trLocalization,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
