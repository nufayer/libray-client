"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface CartItem {
  bookId: string;
  title: string;
  author: string;
  price: number;
  cover: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addToCart: (bookId: string) => Promise<void>;
  removeFromCart: (bookId: string) => Promise<void>;
  updateQuantity: (bookId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/cart`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch {
      // silently fail
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (bookId: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bookId, quantity: 1 }),
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
        toast.success("Added to cart");
      } else {
        toast.error("Failed to add to cart");
      }
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const removeFromCart = async (bookId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/cart/${bookId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
        toast.success("Removed from cart");
      }
    } catch {
      toast.error("Failed to remove from cart");
    }
  };

  const updateQuantity = async (bookId: string, quantity: number) => {
    try {
      const res = await fetch(`${API_URL}/api/cart/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quantity }),
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
      }
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setItems([]);
      }
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
