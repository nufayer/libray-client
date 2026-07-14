"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Heart,
  BookOpen,
  ChevronRight,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  User,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Globe,
  Hash,
  Building,
  Bookmark,
  ArrowLeft,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  fullDescription?: string;
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
  pages?: number;
  publisher?: string;
  publishedDate?: string;
  isbn?: string;
  language?: string;
  tableOfContents?: string[];
}



function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating)
              ? "text-amber-400 fill-current"
              : i < rating
              ? "text-amber-400 fill-current opacity-50"
              : "text-muted-foreground/30"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function BookDetailsPage() {
  const params = useParams();
  const bookId = params.id;

  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews">("description");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/books/${bookId}`);
        if (res.ok) {
          const data = await res.json();
          const bookData = data.book || data;
          setBook(bookData);

          const relatedRes = await fetch(`${API_URL}/api/books?category=${bookData.category}&limit=4`);
          if (relatedRes.ok) {
            const relatedData = await relatedRes.json();
            setRelatedBooks((relatedData.books || []).filter((b: Book) => b._id !== bookData._id).slice(0, 4));
          }
        } else {
          setBook(null);
        }
      } catch {
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card variant="elevated" padding="lg" className="text-center max-w-md">
          <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Book Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The book you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/books" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Browse All Books
          </Link>
        </Card>
      </div>
    );
  }

  const hasDiscount = book.originalPrice && book.originalPrice > book.price;
  const discountPercent = hasDiscount ? Math.round((1 - book.price / book.originalPrice!) * 100) : 0;

  const moreBooks = relatedBooks.length < 4
    ? [...relatedBooks]
    : relatedBooks;

  const ratingDistribution = [
    { stars: 5, percent: 68 },
    { stars: 4, percent: 22 },
    { stars: 3, percent: 7 },
    { stars: 2, percent: 2 },
    { stars: 1, percent: 1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-primary-dark/30 border-b border-border">
        <nav className="section-container py-3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
            <li>
              <Link href="/books" className="hover:text-foreground transition-colors">Books</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
            <li>
              <Link href={`/books?category=${book.category}`} className="hover:text-foreground transition-colors">{book.category}</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
            <li className="text-foreground font-medium truncate max-w-[200px]">{book.title}</li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <main className="section-container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Book Cover */}
          <div className="space-y-4">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-primary-dark border border-card-border">
              {(book.isNew || book.isBestseller) && (
                <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-10">
                  {book.isBestseller && <Badge variant="warning" size="md">Bestseller</Badge>}
                  {book.isNew && <Badge variant="accent" size="md">New Release</Badge>}
                </div>
              )}
              {hasDiscount && (
                <Badge variant="destructive" size="md" className="absolute top-4 right-4 z-10">
                  -{discountPercent}% Off
                </Badge>
              )}
              <img
                src={book.cover}
                alt={`${book.title} by ${book.author} book cover`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i - 1)}
                  className={`w-20 h-28 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === i - 1
                      ? "border-accent"
                      : "border-card-border hover:border-muted-foreground/50"
                  }`}
                >
                  <img
                    src={book.cover}
                    alt={`View ${i}`}
                    className="w-full h-full object-cover opacity-80"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Book Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" size="sm" className="mb-3">{book.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{book.title}</h1>
              <p className="text-lg text-muted-foreground">
                by <span className="text-foreground font-medium">{book.author}</span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={book.rating} />
              <span className="font-semibold text-foreground">{book.rating}</span>
              <span className="text-muted-foreground">({book.reviewCount.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-accent">${book.price.toFixed(2)}</span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${book.originalPrice!.toFixed(2)}</span>
                  <Badge variant="destructive" size="sm">Save ${(book.originalPrice! - book.price).toFixed(2)}</Badge>
                </>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag, i) => (
                <Badge key={i} variant="default" size="sm">#{tag}</Badge>
              ))}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{book.description}</p>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="text-sm font-medium text-foreground">Quantity</label>
                <div className="flex items-center border border-card-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors rounded-l-lg"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-foreground font-medium border-x border-card-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors rounded-r-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  disabled={!book.inStock}
                >
                  <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                  {book.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant={isInWishlist ? "accent" : "outline"}
                  size="lg"
                  onClick={() => setIsInWishlist(!isInWishlist)}
                  aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} aria-hidden="true" />
                </Button>
                <Button variant="outline" size="lg" aria-label="Share">
                  <Share2 className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-card-border">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-5 h-5 text-accent" />
                <span className="text-xs text-muted-foreground">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-xs text-muted-foreground">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-5 h-5 text-accent" />
                <span className="text-xs text-muted-foreground">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-12">
          <div className="flex border-b border-card-border mb-6 overflow-x-auto">
            {[
              { id: "description" as const, label: "Description" },
              { id: "specifications" as const, label: "Specifications" },
              { id: "reviews" as const, label: `Reviews (${book.reviewCount.toLocaleString()})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "text-accent border-accent"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-4">About this book</h2>
              <div className="prose prose-invert max-w-none">
                {book.fullDescription?.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {book.tableOfContents && book.tableOfContents.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Table of Contents</h3>
                  <ol className="space-y-2">
                    {book.tableOfContents.map((chapter, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <span className="w-6 h-6 rounded-full bg-primary-dark flex items-center justify-center text-xs font-medium text-accent">
                          {i + 1}
                        </span>
                        {chapter}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Book Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, label: "Pages", value: book.pages?.toString() || "N/A" },
                  { icon: Building, label: "Publisher", value: book.publisher || "N/A" },
                  { icon: Calendar, label: "Published", value: book.publishedDate || "N/A" },
                  { icon: Hash, label: "ISBN", value: book.isbn || "N/A" },
                  { icon: Globe, label: "Language", value: book.language || "N/A" },
                  { icon: Bookmark, label: "Category", value: book.category },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-card-hover rounded-xl border border-card-border">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-3xl">
              <div className="flex flex-col sm:flex-row gap-8 mb-8">
                {/* Rating Summary */}
                <div className="text-center sm:text-left">
                  <div className="text-5xl font-bold text-foreground mb-2">{book.rating}</div>
                  <StarRating rating={book.rating} size="lg" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {book.reviewCount.toLocaleString()} reviews
                  </p>
                </div>

                {/* Rating Distribution */}
                <div className="flex-1 space-y-2">
                  {ratingDistribution.map((dist) => (
                    <div key={dist.stars} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-8">{dist.stars}★</span>
                      <div className="flex-1 h-2 bg-primary-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${dist.percent}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-10 text-right">{dist.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">No reviews yet. Be the first to review this book.</p>
              </div>
            </div>
          )}
        </div>

        {/* Related Books */}
        {moreBooks.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">You might also like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {moreBooks.map((relatedBook) => (
                <Link
                  key={relatedBook._id}
                  href={`/books/${relatedBook._id}`}
                  className="card-base card-hover group"
                >
                  <div className="aspect-[2/3] overflow-hidden bg-primary-dark rounded-t-xl">
                    <img
                      src={relatedBook.cover}
                      alt={`${relatedBook.title} by ${relatedBook.author}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                      {relatedBook.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{relatedBook.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                        <span className="text-sm font-medium">{relatedBook.rating}</span>
                      </div>
                      <span className="font-bold text-accent">${relatedBook.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
