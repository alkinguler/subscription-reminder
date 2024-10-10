import commonLocale from "./common/common-locale";
import errorLocale from "./errors/error-locale";
import loginLocale from "./login/login-locale";

export default {
  ...loginLocale,
  ...commonLocale,
  ...errorLocale,
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
