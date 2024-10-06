import "./App.css";
import { LanguageSwitcher } from "./components/languageSwitcher";
import Login from "./pages/Login";
import { ThemeToggle } from "./theme/theme-toggle";

function App() {
  return (
    <>
      <div className="flex justify-between mx-auto w-200">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <Login />
    </>
  );
}

export default App;
