import "./App.css";
import { LanguageSwitcher } from "./components/languageSwitcher";
import { Card } from "./components/ui/card";
import Login from "./pages/Login";
import { ThemeToggle } from "./theme/theme-toggle";

function App() {
  return (
    <>
      <Card className=" absolute top-0 left-0 w-[100%] flex flex-row justify-between align-center p-4 dark:bg-slate-600">
        <LanguageSwitcher />
        <ThemeToggle />
      </Card>
      <Login />
    </>
  );
}

export default App;
