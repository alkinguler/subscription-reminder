import useTheme from "./hooks/use-theme";
import { Moon, Sun } from "lucide-react";

import { Switch } from "@/components/ui/switch";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const themeIcon =
    theme === "dark" ? (
      <Moon className="w-4 h-4 mx-auto my-auto" color="black" />
    ) : (
      <Sun className="w-4 h-4 mx-auto my-auto" color="white" />
    );

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return <Switch onCheckedChange={switchTheme}>{themeIcon}</Switch>;
};
