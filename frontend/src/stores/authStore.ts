import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
    id: number;
    username: string;
    email: string;
};

type AuthStore = {
    user: User | null;
    token: string | null;

    login: (user: User, token: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
