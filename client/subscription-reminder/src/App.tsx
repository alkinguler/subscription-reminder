import "./App.css";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { Card } from "./components/ui/card";
import { ThemeToggle } from "./theme/theme-toggle";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "./components/ui/Toaster/toaster";
import useAuthStore from "./store/auth/useAuthStore";
import LogoutButton from "./components/LogoutButton";
import { useEffect } from "react";
function App() {
  const { token, resetAuthData } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      resetAuthData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <Toaster />
      <Card className=" absolute top-0 left-0 w-[100%] flex flex-row justify-between align-center p-4 dark:bg-slate-600 rounded-b-xl rounded-t-none">
        <div className="grid grid-cols-2 gap-2">
          {token ? <LogoutButton /> : <></>}
          <LanguageSwitcher />
        </div>

        <ThemeToggle />
      </Card>
      <Outlet />
    </>
  );
}

export default App;
