import { create } from "zustand";
import zukeeper from "zukeeper";
import { persist } from "zustand/middleware";

declare global {
  interface Window {
    store: unknown;
  }
}

interface User {
  username: string;
  token: string;
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
  resetAuthData: () => void;
}

// Start of Selection
const useAuthStore = create<User>()(
  persist(
    zukeeper((set: (partial: Partial<User>) => void) => ({
      username: "",
      token: "",
      setUsername: (username: string) => set({ username: username }),
      setToken: (token: string) => set({ token: token }),
      resetAuthData: () => set({ token: "", username: "" }),
    })),
    {
      name: "auth-storage",
    }
  )
);

window.store = useAuthStore;

export default useAuthStore;
