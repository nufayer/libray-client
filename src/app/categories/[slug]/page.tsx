"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BookCard, BookGrid } from "@/components/BookCard";
import { Loader2, BookOpen, ArrowLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  bookCount: number;
}

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const categoryRes = await fetch(`${API_URL}/api/categories/${slug}`);
        if (!categoryRes.ok) throw new Error("Category not found");
        const categoryData = await categoryRes.json();
        const categoryInfo = categoryData.category;
        setCategory(categoryInfo);

        const booksRes = await fetch(`${API_URL}/api/books?category=${categoryInfo.name}`);
        if (!booksRes.ok) throw new Error("Failed to fetch books");
        const booksData = await booksRes.json();
        setBooks(booksData.books || []);
      } catch (err) {
        console.error("Error fetching category data:", err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchCategoryData();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-accent animate-spin" aria-hidden="true" />
          <p className="text-muted-foreground">Loading category...</p>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-background">
        <div className="section-container py-16 md:py-24">
          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || "The category you are looking for does not exist."}</p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-accent hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary-dark/50 border-b border-border py-12 md:py-16">
        <div className="section-container">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground font-medium">{category.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl" aria-hidden="true">{category.icon}</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">{category.name}</h1>
            </div>
            <p className="text-muted-foreground text-lg mb-4">{category.description}</p>
            <p className="text-sm text-muted-foreground">
              Showing <strong className="text-foreground">{books.length}</strong> of <strong className="text-foreground">{category.bookCount}</strong> books
            </p>
          </div>
        </div>
      </section>

      <main className="section-container py-8 md:py-12 flex-1">
        {books.length === 0 ? (
          <div className="text-center py-16 md:py-24">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Books available for this Category</h3>
            <p className="text-muted-foreground mb-6">Try exploring other categories or check back later.</p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-primary-dark font-medium hover:bg-accent/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Link>
          </div>
        ) : (
          <BookGrid
            books={books.map((book) => ({ ...book, id: book._id }))}
            showActions
          />
        )}
      </main>
    </div>
  );
}
