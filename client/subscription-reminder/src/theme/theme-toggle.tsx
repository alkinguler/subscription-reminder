import useTheme from "./hooks/use-theme";
import { Moon, Sun } from "lucide-react";

import { Switch } from "@/components/ui/switch";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const themeIcon =
    theme === "dark" ? (
      <Moon className="w-4 h-4 mx-auto my-auto" color="white" />
    ) : (
      <Sun className="w-4 h-4 mx-auto my-auto" color="black" />
    );

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Switch
      className="data-[state=unchecked]:bg-primary data-[state=checked]:bg-primary"
      onCheckedChange={switchTheme}
    >
      {themeIcon}
    </Switch>
  );
};
