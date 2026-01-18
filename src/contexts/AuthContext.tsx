import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { loginWithEmail, logout, registerWithEmail } from "../services/authService";
import { ensureUserDocument, UserRole } from "../services/userService";


type AuthContextValue = {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (u) {
        console.log("AUTH uid/email:", u.uid, u.email);

const r = await ensureUserDocument(u);

console.log("ROLE from ensureUserDocument:", r);
setRole(r);

        try {
          const r = await ensureUserDocument(u);
          setRole(r);
        } catch (e) {
          console.error("ensureUserDocument error:", e);
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role,
      loading,
      login: async (email, password) => {
        await loginWithEmail(email, password);
      },
      register: async (email, password) => {
        await registerWithEmail(email, password);
      },
      signOut: async () => {
        await logout();
      },
    }),
    [user, role, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
