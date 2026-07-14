"use client";

import { useAuth } from "@/lib/auth/AuthProvider";
import { Card } from "@/components/ui/Card";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Wishlist</h1>
          <Card variant="elevated" padding="lg">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Please sign in to view your wishlist
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                You need to be logged in to save and manage your favorite books.
              </p>
              <Link
                href="/login"
                className="btn-primary inline-flex items-center gap-2"
              >
                Sign In
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Wishlist</h1>
        <Card variant="elevated" padding="lg">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Save your favorite books for later. Browse our collection to find
              books you love.
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
