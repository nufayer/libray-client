"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, Package, Loader2, X } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface OrderItem {
  bookId: string;
  title: string;
  author: string;
  price: number;
  cover: string;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "approved" | "rejected" | "cancelled";
  createdAt: string;
}

const statusConfig: Record<string, { label: string; variant: "warning" | "success" | "destructive" | "default" }> = {
  pending: { label: "Pending", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "default" },
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    setCancellingId(orderId);
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/cancel`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to cancel order");
      }
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "cancelled" as const } : o))
      );
      toast.success("Order cancelled");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to cancel order");
    } finally {
      setCancellingId(null);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">My Orders</h1>
          <Card variant="elevated" padding="lg">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">My Orders</h1>
          <Card variant="elevated" padding="lg">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                When you place orders, they will appear here. Start browsing our collection to find your next great read.
              </p>
              <Link href="/books" className="btn-primary inline-flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Orders ({orders.length})</h1>

        <div className="space-y-4">
          {orders.map((order) => {
            const statusInfo = statusConfig[order.status] || statusConfig.pending;
            return (
              <Card key={order._id} variant="elevated" padding="lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm text-muted-foreground">Order</span>
                      <span className="text-sm font-mono text-foreground">#{order._id.slice(-8).toUpperCase()}</span>
                      <Badge variant={statusInfo.variant} size="sm">{statusInfo.label}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg text-accent">${order.totalAmount.toFixed(2)}</span>
                    {order.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cancelOrder(order._id)}
                        loading={cancellingId === order._id}
                        className="text-destructive border-destructive/30 hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.bookId} className="flex gap-3 p-3 bg-primary-dark/30 rounded-lg">
                      <div className="w-12 h-16 flex-shrink-0 rounded overflow-hidden bg-primary-dark">
                        <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/books/${item.bookId}`} className="font-medium text-foreground hover:text-accent transition-colors text-sm line-clamp-1">
                          {item.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">by {item.author}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                          <span className="text-xs text-accent font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
