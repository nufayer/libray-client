"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft, Loader2, Check } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isOrdering, setIsOrdering] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const allSelected = items.length > 0 && selected.size === items.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(items.map((item) => item.bookId)));
    }
  };

  const toggleSelect = (bookId: string) => {
    const next = new Set(selected);
    if (next.has(bookId)) {
      next.delete(bookId);
    } else {
      next.add(bookId);
    }
    setSelected(next);
  };

  const selectedItems = items.filter((item) => selected.has(item.bookId));
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  const handleOrder = async () => {
    setIsOrdering(true);
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bookIds: Array.from(selected) }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to place order");
      }

      toast.success("Order placed successfully!");
      setSelected(new Set());
      setShowConfirm(false);
      router.push("/orders");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to place order");
    } finally {
      setIsOrdering(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
          <Card variant="elevated" padding="lg">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Looks like you haven&apos;t added any books yet. Start browsing to find your next great read.
              </p>
              <Link href="/books" className="btn-primary inline-flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Browse Books
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart ({items.length})</h1>
          <Link href="/books" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select All */}
            <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl border border-card-border">
              <button
                onClick={toggleSelectAll}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  allSelected
                    ? "bg-accent border-accent text-primary-dark"
                    : "border-card-border hover:border-accent"
                }`}
              >
                {allSelected && <Check className="w-3.5 h-3.5" />}
              </button>
              <span className="text-sm font-medium text-foreground">Select All</span>
            </div>

            {/* Items */}
            {items.map((item) => (
              <Card key={item.bookId} variant="default" padding="md">
                <div className="flex gap-4">
                  <button
                    onClick={() => toggleSelect(item.bookId)}
                    className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selected.has(item.bookId)
                        ? "bg-accent border-accent text-primary-dark"
                        : "border-card-border hover:border-accent"
                    }`}
                  >
                    {selected.has(item.bookId) && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-primary-dark">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <Link href={`/books/${item.bookId}`} className="font-semibold text-foreground hover:text-accent transition-colors line-clamp-1">
                        {item.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">by {item.author}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.bookId, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded-lg border border-card-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-card-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-bold text-accent">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeFromCart(item.bookId)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card variant="elevated" padding="lg" className="sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Selected Items</span>
                  <span className="text-foreground">{selected.size} of {items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <hr className="border-card-border" />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-lg text-accent">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full"
                disabled={selected.size === 0 || isOrdering}
                onClick={() => setShowConfirm(true)}
              >
                {isOrdering ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Order Now</>
                )}
              </Button>

              {selected.size > 0 && (
                <button
                  onClick={() => setSelected(new Set())}
                  className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card variant="elevated" padding="lg" className="max-w-md w-full">
            <h3 className="text-xl font-bold text-foreground mb-2">Confirm Your Order</h3>
            <p className="text-muted-foreground mb-2">
              You are about to order {selected.size} item{selected.size !== 1 ? "s" : ""} for{" "}
              <span className="font-bold text-accent">${total.toFixed(2)}</span>.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              You will be able to track your order status in the Orders section.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirm(false)}
                disabled={isOrdering}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleOrder}
                disabled={isOrdering}
              >
                {isOrdering ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Order"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
