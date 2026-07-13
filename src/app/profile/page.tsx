"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { User, Mail, Shield, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, refetch } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(user?.name || "");

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name: name.trim() }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      await refetch();
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Profile</h1>

        <Card variant="elevated" padding="lg" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <span className="text-accent text-3xl font-bold">
                  {user.name?.[0]?.toUpperCase() ||
                    user.email?.[0]?.toUpperCase() ||
                    "U"}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {user.name || "User"}
              </h2>
              <p className="text-muted-foreground">{user.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-accent/20 text-accent rounded-full capitalize">
                {user.role || "user"}
              </span>
            </div>
          </div>

          <hr className="border-card-border" />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Account Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Name
                </label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      leftIcon={<User className="w-5 h-5" />}
                    />
                    <Button
                      onClick={handleSave}
                      loading={isSaving}
                      variant="primary"
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setName(user?.name || "");
                      }}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-card-hover rounded-lg">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">
                      {user.name || "Not set"}
                    </span>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="ghost"
                      size="sm"
                      className="ml-auto"
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Email
                </label>
                <div className="flex items-center gap-2 p-3 bg-card-hover rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{user.email}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Role
                </label>
                <div className="flex items-center gap-2 p-3 bg-card-hover rounded-lg">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground capitalize">
                    {user.role || "user"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
