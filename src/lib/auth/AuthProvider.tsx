"use client";

import { ReactNode, createContext, useContext } from "react";
import { useSession } from "@/lib/auth/client";

interface AuthContextType {
  user: SessionUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetch: () => Promise<void>;
}

interface SessionUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending, refetch } = useSession();

  const user: SessionUser | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name ?? null,
        email: session.user.email ?? "",
        role: (session.user as { role?: string }).role ?? "user",
        image: (session.user as { image?: string | null }).image ?? null,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isPending,
        isAuthenticated: !!session?.user,
        refetch: refetch as () => Promise<void>,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
