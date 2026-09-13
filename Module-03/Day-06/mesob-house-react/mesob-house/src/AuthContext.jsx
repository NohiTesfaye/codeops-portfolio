import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, method } | null

  function signInWithGoogle() {
    setUser({ name: "Google Account", method: "Google" });
  }

  function signInWithTelebirr() {
    setUser({ name: "Telebirr User", method: "Telebirr" });
  }

  function signInWithPhone(phone) {
    setUser({ name: phone || "Mobile User", method: "Phone" });
  }

  function continueAsGuest() {
    setUser({ name: "Guest", method: "Guest" });
  }

  function signOut() {
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    signInWithGoogle,
    signInWithTelebirr,
    signInWithPhone,
    continueAsGuest,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
