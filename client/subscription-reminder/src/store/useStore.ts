import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./auth/authSlice";
import {
  createTranslationSlice,
  TranslationSlice,
} from "./translation/translationSlice";
import { devtools, persist } from "zustand/middleware";
import _ from "lodash";

type CombinedState = TranslationSlice & AuthSlice;

declare global {
  interface Window {
    store: typeof useStore;
  }
}

// Combined store
export const useStore = create<
  CombinedState,
  [["zustand/devtools", never], ["zustand/persist", CombinedState]]
>(
  devtools(
    persist(
      (...set) => ({
        ...createTranslationSlice(...set),
        ...createAuthSlice(...set),
      }),
      {
        merge: (persistedState, currentState) =>
          _.merge(currentState, persistedState),
        name: "app-storage", // unique name for the storage
      }
    )
  )
);
// Selectors
export const useAuthSlice = () => useStore((state) => state.authSlice);

export const useTranslationSlice = () =>
  useStore((state) => state.translationSlice);

export default useStore;
