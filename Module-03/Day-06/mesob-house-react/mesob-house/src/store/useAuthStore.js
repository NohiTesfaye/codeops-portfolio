import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null, // { name, method } | null
  isAuthenticated: false,

  signInWithGoogle: () =>
    set({ user: { name: "Google Account", method: "Google" }, isAuthenticated: true }),

  signInWithTelebirr: () =>
    set({ user: { name: "Telebirr User", method: "Telebirr" }, isAuthenticated: true }),

  signInWithPhone: (identifier) =>
    set({
      user: { name: identifier || "Mobile User", method: "Phone / Email" },
      isAuthenticated: true,
    }),

  continueAsGuest: () =>
    set({ user: { name: "Guest", method: "Guest access" }, isAuthenticated: true }),

  signOut: () => set({ user: null, isAuthenticated: false }),
}));
