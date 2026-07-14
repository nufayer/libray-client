"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { CartProvider } from "@/lib/CartContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <Toaster position="top-right" richColors />
      </CartProvider>
    </AuthProvider>
  );
}