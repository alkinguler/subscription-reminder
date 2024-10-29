import { StateCreator } from "zustand";

export interface TranslationSlice {
  translationSlice: TranslationState;
}

interface TranslationState {
  language: string;
  setLanguage: (language: string) => void;
}

const setTranslationState = (
  state: TranslationSlice,
  modifiedValues: object
) => ({
  translationSlice: { ...state.translationSlice, ...modifiedValues },
});

export const createTranslationSlice: StateCreator<
  TranslationSlice,
  [],
  [],
  TranslationSlice
> = (set) => ({
  translationSlice: {
    language: "",
    setLanguage: (language: string) =>
      set((state) => setTranslationState(state, { language: language })),
  },
});
