import "./App.css";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { Card } from "./components/ui/card";
import { ThemeToggle } from "./theme/theme-toggle";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "./components/ui/Toaster/toaster";
import LogoutButton from "./components/LogoutButton";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthSlice, useTranslationSlice } from "./store/useStore";
import i18n from "./locale/i18n";

function App() {
  const { token, resetAuthData } = useAuthSlice();
  const { language } = useTranslationSlice();
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      resetAuthData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Card className="absolute top-0 left-0 w-[100%] flex flex-row justify-between align-center p-4 dark:bg-slate-600 rounded-b-xl rounded-t-none">
          <div className="grid grid-cols-2 gap-2">
            {token ? <LogoutButton /> : <></>}
            <LanguageSwitcher />
          </div>
          <ThemeToggle />
        </Card>

        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;
