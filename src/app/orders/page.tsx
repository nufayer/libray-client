"use client";

import { useAuth } from "@/lib/auth/AuthProvider";
import { Card } from "@/components/ui/Card";
import { ShoppingBag, Package } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Orders</h1>

        <Card variant="elevated" padding="lg">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No orders yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              When you place orders, they will appear here. Start browsing our
              collection to find your next great read.
            </p>
            <Link
              href="/books"
              className="btn-primary inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Browse Books
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
