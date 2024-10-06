import Button from "@/components/ui/Button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTheme from "./hooks/use-theme";
import { Moon, Sun, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ThemeToggle = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "themeToggle",
  });
  const { setTheme } = useTheme();

  type DropdownMenuItem = {
    icon: React.JSX.Element;
    label: string;
    onClick: () => void;
  };

  const dropdownMenuItemsArray: DropdownMenuItem[] = [
    {
      icon: <Sun className="mr-2 h-4 w-4" />,
      label: t("light"),
      onClick: () => setTheme("light"),
    },
    {
      icon: <Moon className="mr-2 h-4 w-4" />,
      label: t("dark"),
      onClick: () => setTheme("dark"),
    },
    {
      icon: <Settings className="mr-2 h-4 w-4" />,
      label: t("system"),
      onClick: () => setTheme("system"),
    },
  ];

  const renderDropdownMenuItems = () => {
    return dropdownMenuItemsArray.map((item) => (
      <DropdownMenuItem onClick={item.onClick}>
        {item.icon}
        {item.label}
      </DropdownMenuItem>
    ));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="absolute rotate-0 scale-100 transition duration-300 ease-linear dark:-rotate-90 dark:scale-0 " />
          <Moon className="absolute rotate-90 scale-0 transition duration-300 ease-linear dark:rotate-0 dark:scale-100 " />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("title")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderDropdownMenuItems()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
