"use client";

import { useAuth } from "@/lib/auth/AuthProvider";
import { Card } from "@/components/ui/Card";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Users,
  Shield,
} from "lucide-react";
import Link from "next/link";

const adminCards = [
  {
    title: "Manage Books",
    description: "Add, edit, and organize your book catalog",
    href: "/admin/books",
    icon: BookOpen,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    title: "Manage Orders",
    description: "View and process customer orders",
    href: "/admin/orders",
    icon: ShoppingBag,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    title: "Manage Users",
    description: "View and manage user accounts",
    href: "/admin/users",
    icon: Users,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card variant="elevated" padding="lg" className="text-center max-w-md">
          <Shield className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You don&apos;t have permission to access this page.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card) => (
            <Link key={card.href} href={card.href}>
              <Card
                variant="elevated"
                padding="lg"
                className="h-full hover:border-accent/50 transition-colors cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  {card.title}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {card.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
