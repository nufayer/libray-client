"use client";

import { useAuth } from "@/lib/auth/AuthProvider";

export function useRole() {
  const { user, isLoading, isAuthenticated } = useAuth();

  const isAdmin = isAuthenticated && user?.role === "admin";
  const isUser = isAuthenticated && user?.role === "user";

  return {
    role: user?.role ?? null,
    isAdmin,
    isUser,
    isLoading,
    isAuthenticated,
  };
}
