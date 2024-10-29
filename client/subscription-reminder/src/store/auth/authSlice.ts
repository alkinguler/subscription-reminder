import { StateCreator } from "zustand";

export interface AuthSlice {
  authSlice: AuthSliceState;
}

interface AuthSliceState {
  username: string;
  token: string;
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
  resetAuthData: () => void;
}

const setAuthState = (state: AuthSlice, modifiedValues: object) => ({
  authSlice: { ...state.authSlice, ...modifiedValues },
});

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  authSlice: {
    username: "",
    token: "",
    setUsername: (username: string) =>
      set((state) => setAuthState(state, { username: username })),
    setToken: (token: string) =>
      set((state) => setAuthState(state, { token: token })),
    resetAuthData: () =>
      set((state) => setAuthState(state, { username: "", token: "" })),
  },
});
