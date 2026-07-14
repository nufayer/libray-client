"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Star, Loader2, Grid, List } from "lucide-react";
import { BookCard, BookGrid } from "@/components/BookCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Book {
  _id: string;
  id?: string;
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
  isFeatured?: boolean;
  pages?: number;
  publisher?: string;
  publishedDate?: string;
  isbn?: string;
  language?: string;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "bestselling", label: "Best Selling" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "title-asc", label: "Title: A to Z" },
];

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>(["All Categories"]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/books`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setBooks(data.books);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        const names = data.categories.map((c: any) => c.name);
        setCategories(["All Categories", ...names]);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.category.toLowerCase().includes(query) ||
          book.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== "All Categories") {
      result = result.filter((book) => book.category === selectedCategory);
    }

    if (inStockOnly) {
      result = result.filter((book) => book.inStock);
    }

    switch (sortBy) {
      case "bestselling":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort((a, b) => (b.isFeatured === a.isFeatured ? 0 : b.isFeatured ? 1 : -1));
    }

    return result;
  }, [books, searchQuery, selectedCategory, sortBy, inStockOnly]);

  const mapBook = (book: Book) => ({
    id: book._id || book.id || "",
    title: book.title,
    author: book.author,
    description: book.description,
    cover: book.cover,
    rating: book.rating,
    reviewCount: book.reviewCount,
    price: book.price,
    originalPrice: book.originalPrice,
    category: book.category,
    tags: book.tags || [],
    inStock: book.inStock,
    isNew: book.isNew,
    isBestseller: book.isBestseller,
    isFeatured: book.isFeatured,
    pages: book.pages,
    publisher: book.publisher,
    publishedDate: book.publishedDate,
    isbn: book.isbn,
    language: book.language,
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary-dark/50 border-b border-border py-12 md:py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Browse All Books</h1>
            <p className="text-muted-foreground text-lg">
              Discover our collection of books across every genre.
            </p>
          </div>

          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search books by title, author, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-12"
                aria-label="Search books"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="section-container py-8 md:py-12 flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card border border-card-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={() => {
                    setSelectedCategory("All Categories");
                    setInStockOnly(false);
                    setSearchQuery("");
                  }}>
                    Clear All
                  </Button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="category-filter" className="label-field">Category</label>
                    <select
                      id="category-filter"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="input-field appearance-none bg-card"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="w-4 h-4 rounded border-card-border text-accent focus:ring-accent focus:ring-2"
                      />
                      <span className="text-sm text-foreground">In Stock Only</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-card-border rounded-xl p-5">
                <label htmlFor="sort-select" className="label-field">Sort By</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field appearance-none bg-card"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <strong className="text-foreground">{filteredBooks.length}</strong> of <strong className="text-foreground">{books.length}</strong> books
              </p>
              <div className="flex items-center gap-1 bg-card border border-card-border rounded-lg p-1" role="group" aria-label="View mode">
                <Button
                  variant={viewMode === "grid" ? "primary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "primary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="text-center py-16 md:py-24">
                <Star className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Books Found</h3>
                <p className="text-muted-foreground mb-6">
                  {books.length === 0
                    ? "No books have been added yet. Check back soon!"
                    : "Try adjusting your filters or search terms."}
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                  setInStockOnly(false);
                }}>
                  Clear All Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <BookGrid
                books={filteredBooks.map(mapBook)}
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
                variant="default"
                showActions={true}
              />
            ) : (
              <div className="space-y-4" role="list" aria-label="Book list">
                {filteredBooks.map((book) => (
                  <BookCard key={book._id} book={mapBook(book)} variant="compact" showActions={true} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
