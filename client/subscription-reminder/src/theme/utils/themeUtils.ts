import { DefaultColors } from "tailwindcss/types/generated/colors";
import resolveConfig from "tailwindcss/resolveConfig.js";
import tailwindConfig from "../../../tailwind.config";

interface TailWindColors extends DefaultColors {
  primary: {
    DEFAULT: string;
  };
}
export const getThemeColors = (): TailWindColors => {
  const twConfig = resolveConfig(tailwindConfig);
  return twConfig.theme.colors as TailWindColors;
};
