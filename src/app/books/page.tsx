"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Filter, ChevronDown, ChevronUp, ShoppingCart, Heart, Star, Tag, DollarSign, ArrowUpDown, Loader2, Grid, List } from "lucide-react";
import { BookCard, BookGrid } from "@/components/BookCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

interface Book {
  id: string | number;
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
}

const mockBooks: Book[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right.",
    cover: "/books/midnight-library.jpg",
    rating: 4.8,
    reviewCount: 12450,
    price: 14.99,
    originalPrice: 19.99,
    category: "Fiction",
    tags: ["Bestseller", "Contemporary", "Philosophical"],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy & proven way to build good habits & break bad ones. Tiny changes, remarkable results.",
    cover: "/books/atomic-habits.jpg",
    rating: 4.9,
    reviewCount: 45230,
    price: 16.99,
    originalPrice: 22.99,
    category: "Self-Help",
    tags: ["Bestseller", "Productivity", "Psychology"],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "A lone astronaut must save humanity from extinction in this brilliant sci-fi adventure.",
    cover: "/books/project-hail-mary.jpg",
    rating: 4.7,
    reviewCount: 18760,
    price: 15.99,
    category: "Science Fiction",
    tags: ["New Release", "Space", "Adventure"],
    inStock: true,
    isNew: true,
  },
  {
    id: 4,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    description: "A reclusive Hollywood icon finally tells her story in this captivating tale of love and ambition.",
    cover: "/books/evelyn-hugo.jpg",
    rating: 4.6,
    reviewCount: 22100,
    price: 13.99,
    originalPrice: 18.99,
    category: "Historical Fiction",
    tags: ["Bestseller", "LGBTQ+", "Hollywood"],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 5,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    description: "From the Nobel Prize winner, a haunting look at our changing world through the eyes of an Artificial Friend.",
    cover: "/books/klara-sun.jpg",
    rating: 4.5,
    reviewCount: 8920,
    price: 14.99,
    category: "Literary Fiction",
    tags: ["New Release", "AI", "Dystopian"],
    inStock: true,
    isNew: true,
  },
  {
    id: 6,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't about what you know.",
    cover: "/books/psychology-money.jpg",
    rating: 4.8,
    reviewCount: 31450,
    price: 17.99,
    category: "Finance",
    tags: ["Bestseller", "Investing", "Behavioral Economics"],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 7,
    title: "Circe",
    author: "Madeline Miller",
    description: "A bold and subversive retelling of the goddess Circe's story from Homer's Odyssey.",
    cover: "/books/circe.jpg",
    rating: 4.7,
    reviewCount: 15670,
    price: 12.99,
    originalPrice: 17.99,
    category: "Fantasy",
    tags: ["Mythology", "Greek", "Female Protagonist"],
    inStock: true,
  },
  {
    id: 8,
    title: "Educated",
    author: "Tara Westover",
    description: "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge.",
    cover: "/books/educated.jpg",
    rating: 4.8,
    reviewCount: 28900,
    price: 14.99,
    originalPrice: 19.99,
    category: "Memoir",
    tags: ["Bestseller", "Inspirational", "Coming of Age"],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 9,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    description: "A woman's act of violence against her husband—and the therapist obsessed with uncovering her motive.",
    cover: "/books/silent-patient.jpg",
    rating: 4.4,
    reviewCount: 19800,
    price: 11.99,
    originalPrice: 16.99,
    category: "Thriller",
    tags: ["Psychological", "Mystery", "Page Turner"],
    inStock: true,
  },
  {
    id: 10,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    description: "A coming-of-age story and murder mystery set in the marshes of North Carolina.",
    cover: "/books/crawdads-sing.jpg",
    rating: 4.6,
    reviewCount: 34500,
    price: 13.99,
    originalPrice: 18.99,
    category: "Mystery",
    tags: ["Bestseller", "Nature", "Southern Gothic"],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 11,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description: "A brief history of humankind. From the Stone Age to the Silicon Age.",
    cover: "/books/sapiens.jpg",
    rating: 4.7,
    reviewCount: 25600,
    price: 18.99,
    category: "History",
    tags: ["Anthropology", "Evolution", "Society"],
    inStock: true,
  },
  {
    id: 12,
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A magical story about following your dreams and listening to your heart.",
    cover: "/books/alchemist.jpg",
    rating: 4.5,
    reviewCount: 42100,
    price: 10.99,
    originalPrice: 14.99,
    category: "Fiction",
    tags: ["Classic", "Philosophical", "Inspirational"],
    inStock: true,
  },
];

const categories = [
  "All Categories",
  "Fiction",
  "Self-Help",
  "Science Fiction",
  "Historical Fiction",
  "Literary Fiction",
  "Finance",
  "Fantasy",
  "Memoir",
  "Thriller",
  "Mystery",
  "History",
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50 });
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);

  const filteredBooks = useMemo(() => {
    let result = [...mockBooks];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.category.toLowerCase().includes(query) ||
          book.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== "All Categories") {
      result = result.filter((book) => book.category === selectedCategory);
    }

    if (inStockOnly) {
      result = result.filter((book) => book.inStock);
    }

    result = result.filter((book) => book.price >= priceRange.min && book.price <= priceRange.max);

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
  }, [searchQuery, selectedCategory, sortBy, priceRange, inStockOnly]);

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary-dark/50 border-b border-border py-12 md:py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Browse All Books</h1>
            <p className="text-muted-foreground text-lg">
              Discover over a million titles across every genre. From bestsellers to hidden gems.
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
                    setPriceRange({ min: 0, max: 50 });
                    setInStockOnly(false);
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
                    <label className="label-field">Price Range</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="200"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Math.max(0, Number(e.target.value)) })}
                        className="input-field w-20"
                        aria-label="Minimum price"
                      />
                      <span className="text-muted-foreground">-</span>
                      <input
                        type="number"
                        min="0"
                        max="200"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Math.min(200, Number(e.target.value)) })}
                        className="input-field w-20"
                        aria-label="Maximum price"
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Math.min(200, Number(e.target.value)) })}
                        className="w-full h-2 bg-primary-light appearance-none rounded-lg accent-accent"
                        aria-label="Maximum price slider"
                      />
                    </div>
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
                Showing <strong className="text-foreground">{filteredBooks.length}</strong> of <strong className="text-foreground">{mockBooks.length}</strong> books
              </p>
              <div className="flex items-center gap-1 bg-card border border-card-border rounded-lg p-1" role="group" aria-label="View mode">
                <Button
                  variant={viewMode === "grid" ? "primary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                >
                  <Grid className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "primary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                >
                  <List className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {isLoading ? (
              <BookGrid books={[]} loading={true} loadingCount={12} variant={viewMode === "list" ? "compact" : "default"} />
            ) : filteredBooks.length === 0 ? (
              <div className="text-center py-16 md:py-24">
                <Star className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Books Found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms.</p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                  setPriceRange({ min: 0, max: 50 });
                  setInStockOnly(false);
                }}>
                  Clear All Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <BookGrid
                books={filteredBooks}
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
                variant="default"
                showActions={true}
              />
            ) : (
              <div className="space-y-4" role="list" aria-label="Book list">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} variant="compact" showActions={true} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}