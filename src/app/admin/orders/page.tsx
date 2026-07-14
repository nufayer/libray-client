"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, Package, Loader2, Search, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
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
  userId: string;
  email: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "approved" | "rejected" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

const statusConfig: Record<string, { label: string; variant: "warning" | "success" | "destructive" | "default" }> = {
  pending: { label: "Pending", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "default" },
};

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/orders`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: "approved" | "rejected") => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`${API_URL}/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update order");
      }
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );
      toast.success(`Order ${status}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update order");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items?.some(
        (item) =>
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.author?.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    approved: orders.filter((o) => o.status === "approved").length,
    rejected: orders.filter((o) => o.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Manage Orders</h1>
        <Card variant="elevated" padding="lg">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ShoppingBag className="w-6 h-6 text-accent" />
        <h1 className="text-2xl font-bold text-foreground">Manage Orders</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="elevated" padding="md">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
        </Card>
        <Card variant="elevated" padding="md">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-warning">{stats.pending}</p>
        </Card>
        <Card variant="elevated" padding="md">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-2xl font-bold text-success">{stats.approved}</p>
        </Card>
        <Card variant="elevated" padding="md">
          <p className="text-sm text-muted-foreground">Rejected</p>
          <p className="text-2xl font-bold text-destructive">{stats.rejected}</p>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search by book title, author, or customer email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field w-full pl-10"
        />
      </div>

      {/* Orders Table */}
      <Card variant="elevated" padding="none">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Package className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Found</h3>
            <p className="text-muted-foreground">
              {orders.length === 0
                ? "No orders have been placed yet."
                : "No orders match your search."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Order ID
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Books
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Customer
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Total
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Date
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {filteredOrders.map((order) => {
                  const statusInfo = statusConfig[order.status] || statusConfig.pending;
                  const isExpanded = expandedOrder === order._id;
                  const firstItem = order.items?.[0];

                  return (
                    <>
                      <tr key={order._id} className="hover:bg-card-hover transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-mono text-muted-foreground">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {firstItem && (
                              <div className="w-10 h-14 rounded-lg overflow-hidden bg-primary-dark flex-shrink-0">
                                <img
                                  src={firstItem.cover}
                                  alt={firstItem.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-foreground line-clamp-1">
                                  {firstItem?.title || "Unknown Book"}
                                </p>
                                {order.items.length > 1 && (
                                  <button
                                    onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                                    className="text-xs text-accent hover:underline flex items-center gap-0.5"
                                  >
                                    +{order.items.length - 1} more
                                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                  </button>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                by {firstItem?.author || "Unknown"}
                                {firstItem && firstItem.quantity > 1 && ` (x${firstItem.quantity})`}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-foreground">{order.email || "Unknown"}</p>
                          <p className="text-xs text-muted-foreground font-mono">{order.userId?.slice(-6)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-accent">
                            ${(order.totalAmount || 0).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={statusInfo.variant} size="sm">
                            {statusInfo.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-muted-foreground">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {order.status === "pending" ? (
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateStatus(order._id, "approved")}
                                loading={updatingId === order._id}
                                className="text-success border-success/30 hover:bg-success/10"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateStatus(order._id, "rejected")}
                                loading={updatingId === order._id}
                                className="text-destructive border-destructive/30 hover:bg-destructive/10"
                              >
                                <XCircle className="w-4 h-4" />
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                      </tr>
                      {isExpanded && order.items.length > 1 && (
                        <tr key={`${order._id}-expanded`}>
                          <td colSpan={7} className="px-6 py-3 bg-primary-dark/20">
                            <div className="space-y-2">
                              {order.items.slice(1).map((item) => (
                                <div key={item.bookId} className="flex items-center gap-3">
                                  <div className="w-8 h-11 rounded overflow-hidden bg-primary-dark flex-shrink-0">
                                    <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <p className="text-sm text-foreground">{item.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      by {item.author} {item.quantity > 1 && `(x${item.quantity})`} — ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
