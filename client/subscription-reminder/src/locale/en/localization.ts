import commonLocale from "./common/common-locale";
import errorLocale from "./errors/error-locale";
import loginLocale from "./login/login-locale";

export default {
  ...loginLocale,
  ...commonLocale,
  ...errorLocale,
  themeToggle: {
    title: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  languageSwitcher: {
    changeLanguage: "Change Language",
  },
};
