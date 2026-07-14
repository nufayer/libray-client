"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Mail, Lock, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProfileSettingsPage() {
  const { user, isLoading, refetch } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const [nameInitialized, setNameInitialized] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card variant="elevated" padding="lg">
          <div className="flex flex-col items-center text-center">
            <Lock className="w-12 h-12 text-accent mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Access Denied
            </h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to access your profile settings.
            </p>
            <Button onClick={() => router.push("/login")} variant="primary">
              Sign In
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!nameInitialized && user) {
    setName(user.name || "");
    setNameInitialized(true);
  }

  const handleProfileSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsSavingProfile(true);
    try {
      const res = await fetch(`${API_URL}/api/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to update profile");
      }

      await refetch();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSavingPassword(true);
    try {
      const res = await fetch(`${API_URL}/api/user/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to change password");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to change password"
      );
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>

        <Card variant="elevated" padding="lg" className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">
            Account Information
          </h2>

          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            leftIcon={<User className="w-5 h-5" />}
          />

          <Input
            label="Email"
            value={user.email}
            disabled
            leftIcon={<Mail className="w-5 h-5" />}
            helperText="Email cannot be changed"
          />

          <div className="flex justify-end">
            <Button
              onClick={handleProfileSave}
              loading={isSavingProfile}
              variant="primary"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </Card>

        <Card variant="elevated" padding="lg" className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">
            Change Password
          </h2>

          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            leftIcon={<Lock className="w-5 h-5" />}
          />

          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            leftIcon={<Lock className="w-5 h-5" />}
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            leftIcon={<Lock className="w-5 h-5" />}
          />

          <div className="flex justify-end">
            <Button
              onClick={handlePasswordChange}
              loading={isSavingPassword}
              variant="primary"
            >
              <Lock className="w-4 h-4" />
              Change Password
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
