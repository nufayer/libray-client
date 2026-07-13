"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, Tag } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";

export interface Category {
  id: string | number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
  bookCount: number;
  subcategories?: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

interface CategoryCardProps {
  category: Category;
  variant?: "default" | "compact" | "featured";
  showBookCount?: boolean;
}

export function CategoryCard({ category, variant = "default", showBookCount = true }: CategoryCardProps) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    BookOpen,
    Tag,
    ArrowRight,
  };

  const Icon = iconMap[category.icon] || BookOpen;

  if (variant === "compact") {
    return (
      <Link 
        href={`/categories/${category.slug}`} 
        className="card-base card-hover flex items-center gap-4 p-4 group"
      >
        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
          <Icon className="w-6 h-6 text-accent" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-accent transition-colors">{category.name}</h3>
          {showBookCount && (
            <p className="text-sm text-muted-foreground">{category.bookCount.toLocaleString()} books</p>
          )}
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" aria-hidden="true" />
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <article className="card-base card-hover overflow-hidden relative group">
        {category.image && (
          <div className="absolute inset-0 z-0">
            <img
              src={category.image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/10 to-transparent" />
          </div>
        )}
        
        <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
          <div className="w-14 h-14 rounded-xl bg-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent/25 transition-colors">
            <Icon className="w-7 h-7 text-accent" aria-hidden="true" />
          </div>
          
          {(category.isNew || category.isPopular) && (
            <div className="flex gap-2 mb-4">
              {category.isPopular && <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500 text-primary-dark">Popular</span>}
              {category.isNew && <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-accent text-primary-dark">New</span>}
            </div>
          )}
          
          <h3 className="font-bold text-xl md:text-2xl text-foreground mb-2 group-hover:text-accent transition-colors">{category.name}</h3>
          <p className="text-muted-foreground mb-4 flex-1">{category.description}</p>
          
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {category.subcategories.slice(0, 4).map((sub, i) => (
                <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-card-border text-muted-foreground border border-card-border/50">
                  {sub}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-card-border/50">
            {showBookCount && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>{category.bookCount.toLocaleString()} books</span>
              </div>
            )}
            <LinkButton 
              href={`/categories/${category.slug}`} 
              variant="primary" 
              size="sm"
              className="group"
            >
              Explore
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </LinkButton>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card-base card-hover p-6 text-center group">
      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
        <Icon className="w-8 h-8 text-accent" aria-hidden="true" />
      </div>
      
      {(category.isNew || category.isPopular) && (
        <div className="flex justify-center gap-2 mb-3">
          {category.isPopular && <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500 text-primary-dark">Popular</span>}
          {category.isNew && <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-accent text-primary-dark">New</span>}
        </div>
      )}
      
      <Link href={`/categories/${category.slug}`} className="block">
        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">{category.name}</h3>
      </Link>
      <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
      
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {category.subcategories.slice(0, 3).map((sub, i) => (
            <span key={i} className="px-2 py-0.5 text-xs rounded bg-card-border text-muted-foreground">
              {sub}
            </span>
          ))}
          {category.subcategories.length > 3 && (
            <span className="px-2 py-0.5 text-xs rounded bg-card-border text-muted-foreground">
              +{category.subcategories.length - 3} more
            </span>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-center gap-2 pt-4 border-t border-card-border/50">
        {showBookCount && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>{category.bookCount.toLocaleString()} books</span>
          </div>
        )}
        <LinkButton 
          href={`/categories/${category.slug}`} 
          variant="outline" 
          size="sm"
          className="group"
        >
          Browse
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </LinkButton>
      </div>
    </article>
  );
}

interface CategoryGridProps {
  categories: Category[];
  columns?: { base: number; sm: number; md: number; lg: number; xl: number };
  variant?: "default" | "compact" | "featured";
  showBookCount?: boolean;
  emptyMessage?: string;
  loading?: boolean;
  loadingCount?: number;
}

export function CategoryGrid({ 
  categories, 
  columns = { base: 1, sm: 2, md: 3, lg: 4, xl: 5 },
  variant = "default",
  showBookCount = true,
  emptyMessage = "No categories found",
  loading = false,
  loadingCount = 8,
}: CategoryGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: loadingCount }).map((_, i) => (
          <CategoryCardSkeleton key={i} variant={variant} />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-16 md:py-24">
        <Tag className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-foreground mb-2">{emptyMessage}</h3>
        <p className="text-muted-foreground">Check back later for new categories.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 md:gap-6 grid-cols-${columns.base} sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} xl:grid-cols-${columns.xl}`}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          variant={variant}
          showBookCount={showBookCount}
        />
      ))}
    </div>
  );
}

function CategoryCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" | "featured" }) {
  if (variant === "compact") {
    return (
      <div className="card-base flex items-center gap-4 p-4 animate-pulse">
        <div className="w-12 h-12 rounded-lg bg-card-border" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 bg-card-border rounded" />
          <div className="h-3 w-1/2 bg-card-border rounded" />
        </div>
        <div className="w-5 h-5 bg-card-border rounded" />
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <article className="card-base h-[300px] animate-pulse">
        <div className="absolute inset-0 bg-card-border" />
        <div className="relative z-10 p-6 h-full flex flex-col space-y-4">
          <div className="w-14 h-14 rounded-xl bg-card-border" />
          <div className="h-8 w-1/2 bg-card-border rounded" />
          <div className="h-6 w-3/4 bg-card-border rounded" />
          <div className="h-4 w-full bg-card-border rounded" />
          <div className="h-4 w-5/6 bg-card-border rounded" />
          <div className="flex flex-wrap gap-2">
            <div className="h-5 w-16 bg-card-border rounded-full" />
            <div className="h-5 w-20 bg-card-border rounded-full" />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-card-border">
            <div className="h-5 w-24 bg-card-border rounded" />
            <div className="h-9 w-24 bg-card-border rounded-lg" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card-base p-6 text-center animate-pulse space-y-4">
      <div className="w-16 h-16 mx-auto rounded-xl bg-card-border" />
      <div className="h-6 w-3/4 mx-auto bg-card-border rounded" />
      <div className="h-4 w-full bg-card-border rounded" />
      <div className="h-4 w-5/6 bg-card-border rounded" />
      <div className="flex justify-center gap-2">
        <div className="h-5 w-14 bg-card-border rounded-full" />
        <div className="h-5 w-16 bg-card-border rounded-full" />
      </div>
      <div className="flex items-center justify-center gap-2 pt-4 border-t border-card-border">
        <div className="h-5 w-20 bg-card-border rounded" />
        <div className="h-8 w-20 bg-card-border rounded-lg" />
      </div>
    </article>
  );
}