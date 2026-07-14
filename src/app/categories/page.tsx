"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ChevronRight, Loader2, Tag } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
  bookCount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Total Categories", value: categories.length, icon: Tag },
    { label: "Total Books", value: categories.reduce((sum, c) => sum + c.bookCount, 0).toLocaleString(), icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary-dark/50 border-b border-border py-12 md:py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Browse Categories</h1>
            <p className="text-muted-foreground text-lg">
              Explore our extensive collection organized by genre and topic. Find exactly what you're looking for.
            </p>
          </div>

          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-12"
                aria-label="Search categories"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="section-container py-8 md:py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} variant="elevated" padding="md" className="text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-accent/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-accent" aria-hidden="true" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <strong className="text-foreground">{filteredCategories.length}</strong> of <strong className="text-foreground">{categories.length}</strong> categories
          </p>
          <div className="flex items-center gap-1 bg-card border border-card-border rounded-lg p-1" role="group" aria-label="View mode">
            <Button
              variant={viewMode === "grid" ? "primary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </Button>
            <Button
              variant={viewMode === "list" ? "primary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className={`grid gap-4 md:gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4"}`} role="status" aria-label="Loading categories">
            {Array.from({ length: 8 }).map((_, i) => (
              <CategoryCardSkeleton key={i} variant={viewMode} />
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-16 md:py-24">
            <Tag className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Categories Found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search terms.</p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>Clear Search</Button>
          </div>
        ) : (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" role="list" aria-label="Category grid">
              {filteredCategories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          ) : (
            <div className="space-y-4" role="list" aria-label="Category list">
              {filteredCategories.map((category) => (
                <CategoryCardList key={category._id} category={category} />
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="card-base card-hover overflow-hidden relative group" role="listitem">
      <Link href={`/categories/${category.slug}`} className="block" aria-label={`Browse ${category.name} books`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          {category.image ? (
            <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark" aria-hidden="true" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-accent/30" aria-hidden="true" />
          </div>
        </div>
        <div className="p-4 md:p-5">
          <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">{category.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{category.description}</p>
          <div className="flex items-center justify-between pt-3 border-t border-card-border">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>{category.bookCount.toLocaleString()} books</span>
            </div>
            <div className="flex items-center gap-1 text-accent group-hover:gap-2 transition-all">
              <span className="font-medium text-sm">Explore</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function CategoryCardList({ category }: { category: Category }) {
  return (
    <article className="card-base card-hover flex flex-col sm:flex-row gap-4 p-4" role="listitem">
      <Link href={`/categories/${category.slug}`} className="relative w-full sm:w-48 flex-shrink-0 aspect-[4/3] rounded-lg overflow-hidden" aria-label={`Browse ${category.name} books`}>
        {category.image ? (
          <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-accent/30" aria-hidden="true" />
            </div>
          </>
        )}
      </Link>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <Link href={`/categories/${category.slug}`} className="font-bold text-lg text-foreground hover:text-accent transition-colors mb-1 block">
            {category.name}
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{category.description}</p>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-card-border mt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>{category.bookCount.toLocaleString()} books</span>
          </div>
          <Link 
            href={`/categories/${category.slug}`} 
            className="flex items-center gap-1 text-accent font-medium text-sm hover:gap-2 transition-all group"
          >
            <span>Explore Category</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function CategoryCardSkeleton({ variant = "grid" }: { variant: "grid" | "list" }) {
  if (variant === "list") {
    return (
      <article className="card-base flex flex-col sm:flex-row gap-4 p-4 animate-pulse">
        <div className="relative w-full sm:w-48 flex-shrink-0 aspect-[4/3] rounded-lg bg-card-border" />
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="space-y-2">
            <div className="h-5 w-1/3 bg-card-border rounded" />
            <div className="h-4 w-full bg-card-border rounded" />
            <div className="h-4 w-5/6 bg-card-border rounded" />
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-card-border mt-4">
            <div className="h-4 w-24 bg-card-border rounded" />
            <div className="h-8 w-28 bg-card-border rounded-lg" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card-base overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-card-border" />
      <div className="p-4 md:p-5 space-y-3">
        <div className="h-5 w-1/3 bg-card-border rounded" />
        <div className="h-4 w-full bg-card-border rounded" />
        <div className="h-4 w-5/6 bg-card-border rounded" />
        <div className="flex items-center justify-between pt-3 border-t border-card-border">
          <div className="h-4 w-24 bg-card-border rounded" />
          <div className="h-8 w-20 bg-card-border rounded-lg" />
        </div>
      </div>
    </article>
  );
}
