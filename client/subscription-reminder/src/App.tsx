import "./App.css";
import { LanguageSwitcher } from "./components/languageSwitcher";
import { Card } from "./components/ui/card";
import { ThemeToggle } from "./theme/theme-toggle";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/Toaster/toaster";

function App() {
  return (
    <>
      <Toaster />
      <Card className=" absolute top-0 left-0 w-[100%] flex flex-row justify-between align-center p-4 dark:bg-slate-600 rounded-b-xl rounded-t-none">
        <LanguageSwitcher />
        <ThemeToggle />
      </Card>
      <Outlet />
    </>
  );
}

export default App;
