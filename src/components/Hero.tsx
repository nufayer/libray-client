"use client";

import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, Sparkles, ArrowRight as ArrowRightIcon } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="relative min-h-[70vh] max-h-[80vh] flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src="/banner.jpg"
            alt="LibRay bookstore banner"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/70 via-primary/50 to-primary-dark/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent)_0%,_transparent_70%)] opacity-15" />
        </div>
        <div className="relative z-10 section-container py-8 md:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6 animate-slide-up">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                Discover Your Next Favorite Book
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
                Welcome to{" "}
                <span className="gradient-text">LibRay</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "200ms" }}>
                Explore over a million titles across every genre. From bestsellers to hidden gems, your next adventure starts here.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-slide-up" style={{ animationDelay: "300ms" }}>
                <LinkButton href="/books" variant="primary" size="lg" className="group">
                  Browse Books
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </LinkButton>
                <LinkButton href="/categories" variant="outline" size="lg">
                  Explore Categories
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[70vh] max-h-[80vh] flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <img
          src="/banner.jpg"
          alt="LibRay bookstore banner"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/70 via-primary/50 to-primary-dark/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent)_0%,_transparent_70%)] opacity-15" />
      </div>

      <div className="relative z-10 section-container py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-medium mb-6 animate-slide-up backdrop-blur-sm">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Discover Your Next Favorite Book
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
              Welcome to{" "}
              <span className="gradient-text">LibRay</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "200ms" }}>
              Explore over a million titles across every genre. From bestsellers to hidden gems, your next adventure starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <LinkButton href="/books" variant="primary" size="lg" className="group">
                Browse Books
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </LinkButton>
              <LinkButton href="/categories" variant="outline" size="lg">
                Explore Categories
              </LinkButton>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8 text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
            <StatCard value="1M+" label="Books Available" icon={BookOpen} />
            <StatCard value="50K+" label="Happy Readers" icon={Sparkles} />
            <StatCard value="24/7" label="Support Available" icon={ArrowRightIcon} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="card-base p-6">
      <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-accent/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-accent" aria-hidden="true" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-foreground gradient-text">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}