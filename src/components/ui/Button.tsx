"use client";

import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
    
    const variants = {
      primary: "bg-accent text-primary-dark hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20 focus:ring-accent",
      secondary: "bg-primary-light text-foreground border border-primary-light/30 hover:bg-primary-light/20 hover:border-primary-light/50 focus:ring-primary-light",
      outline: "border border-card-border bg-transparent hover:bg-card-hover hover:border-primary-light/50 focus:ring-primary-light",
      ghost: "text-muted-foreground hover:text-foreground hover:bg-card-hover focus:ring-primary-light",
      destructive: "bg-destructive text-white hover:bg-destructive-hover hover:shadow-lg hover:shadow-destructive/20 focus:ring-destructive",
      accent: "bg-accent text-primary-dark hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20 focus:ring-accent",
    };
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-5 py-2.5 text-base gap-2",
      lg: "px-7 py-3.5 text-lg gap-2.5",
      icon: "p-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

type ButtonOnlyProps = "type" | "form" | "formAction" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture";

export interface LinkButtonProps extends Omit<ButtonProps, ButtonOnlyProps> {
  href: string;
}

const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {} as AnchorHTMLAttributes<HTMLAnchorElement>;
type AnchorOnlyProps = keyof typeof anchorProps;

type LinkButtonAllowedProps = Omit<LinkButtonProps, ButtonOnlyProps> & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, AnchorOnlyProps>;

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonAllowedProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, href, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
    
    const variants = {
      primary: "bg-accent text-primary-dark hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20 focus:ring-accent",
      secondary: "bg-primary-light text-foreground border border-primary-light/30 hover:bg-primary-light/20 hover:border-primary-light/50 focus:ring-primary-light",
      outline: "border border-card-border bg-transparent hover:bg-card-hover hover:border-primary-light/50 focus:ring-primary-light",
      ghost: "text-muted-foreground hover:text-foreground hover:bg-card-hover focus:ring-primary-light",
      destructive: "bg-destructive text-white hover:bg-destructive-hover hover:shadow-lg hover:shadow-destructive/20 focus:ring-destructive",
      accent: "bg-accent text-primary-dark hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20 focus:ring-accent",
    };
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-5 py-2.5 text-base gap-2",
      lg: "px-7 py-3.5 text-lg gap-2.5",
      icon: "p-2.5",
    };

    if (loading || disabled) {
      return (
        <span
          ref={ref}
          className={cn(baseStyles, variants[variant], sizes[size], className, "pointer-events-none")}
          {...props}
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {children}
        </span>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);

LinkButton.displayName = "LinkButton";