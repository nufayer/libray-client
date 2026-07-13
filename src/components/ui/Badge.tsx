"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "outline" | "accent";
  size?: "sm" | "md" | "lg";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center font-medium rounded-full transition-colors";
    
    const variants = {
      default: "bg-primary-light/20 text-primary-light border border-primary-light/30",
      success: "bg-success/15 text-success border border-success/30",
      warning: "bg-warning/15 text-warning border border-warning/30",
      destructive: "bg-destructive/15 text-destructive border border-destructive/30",
      outline: "bg-transparent text-foreground border border-card-border",
      accent: "bg-accent/15 text-accent border border-accent/30",
    };
    
    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-3 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";