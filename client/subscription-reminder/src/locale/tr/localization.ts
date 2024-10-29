import commonLocale from "./common/common-locale";
import errorLocale from "./errors/error-locale";
import loginLocale from "./login/login-locale";
import subscriptionLocale from "./subscription/subscription-locale";

export default {
  ...loginLocale,
  ...commonLocale,
  ...errorLocale,
  ...subscriptionLocale,
  themeToggle: {
    title: "Tema",
    light: "Aydınlık",
    dark: "Karanlık",
    system: "Sistem Rengi",
  },
  languageSwitcher: {
    changeLanguage: "Dil Değiştir",
  },
};
