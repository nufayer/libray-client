"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart, BookOpen, Tag, DollarSign } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useCart } from "@/lib/CartContext";

export interface Book {
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
  pages?: number;
  publisher?: string;
  publishedDate?: string;
  isbn?: string;
  language?: string;
}

interface BookCardProps {
  book: Book;
  variant?: "default" | "compact" | "featured";
  showActions?: boolean;
  onAddToCart?: (book: Book) => void;
  onAddToWishlist?: (book: Book) => void;
}

export function BookCard({ 
  book, 
  variant = "default", 
  showActions = true,
  onAddToCart,
  onAddToWishlist,
}: BookCardProps) {
  const { addToCart } = useCart();
  const handleAddToCart = onAddToCart || (() => addToCart(String(book.id)));
  const hasDiscount = book.originalPrice && book.originalPrice > book.price;
  const discountPercent = hasDiscount ? Math.round((1 - book.price / book.originalPrice!) * 100) : 0;

  if (variant === "compact") {
    return (
      <Link href={`/books/${book.id}`} className="card-base card-hover flex gap-4 p-3 transition-all duration-300">
        <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-primary-dark">
          <img src={book.cover} alt="" className="w-full h-full object-cover" loading="lazy" />
          {(book.isNew || book.isBestseller) && (
            <Badge variant={book.isBestseller ? "warning" : "accent"} className="absolute top-2 left-2" size="sm">
              {book.isBestseller ? "Bestseller" : "New"}
            </Badge>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-foreground line-clamp-1">{book.title}</h4>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-current" aria-hidden="true" />
              <span className="text-sm font-medium">{book.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-accent">${book.price.toFixed(2)}</span>
              {hasDiscount && <span className="text-xs text-muted-foreground line-through">${book.originalPrice!.toFixed(2)}</span>}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="card-base card-hover flex flex-col h-full overflow-hidden group relative">
      <div className="relative aspect-[2/3] overflow-hidden bg-primary-dark">
        {(book.isNew || book.isBestseller) && (
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
            {book.isBestseller && <Badge variant="warning" size="sm">Bestseller</Badge>}
            {book.isNew && <Badge variant="accent" size="sm">New Release</Badge>}
          </div>
        )}
        {hasDiscount && (
          <Badge variant="destructive" size="sm" className="absolute top-3 right-3">
            -{discountPercent}% Off
          </Badge>
        )}
        <img
          src={book.cover}
          alt={`${book.title} by ${book.author} book cover`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
        
        {showActions && (
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToWishlist?.(book); }}
              className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm border border-card-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-card hover:border-destructive/50 transition-all duration-200"
              aria-label={`Add ${book.title} to wishlist`}
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(book); }}
              className="w-9 h-9 rounded-full bg-accent/90 text-primary-dark flex items-center justify-center hover:bg-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-200"
              aria-label={`Add ${book.title} to cart`}
            >
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" size="sm">{book.category}</Badge>
          {book.tags.slice(0, 2).map((tag, i) => (
            <Badge key={i} variant="default" size="sm">#{tag}</Badge>
          ))}
        </div>
        
        <Link href={`/books/${book.id}`} className="block">
          <h3 className="font-bold text-lg md:text-xl text-foreground mb-1.5 line-clamp-1 group-hover:text-accent transition-colors">{book.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">by {book.author}</p>
        
        <p className="text-sm text-muted-foreground/80 line-clamp-2 mb-4 flex-1">{book.description}</p>
        
        <div className="flex flex-wrap items-center gap-3 mb-4 pt-3 border-t border-card-border">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" aria-hidden="true" />
            <span className="font-medium text-foreground">{book.rating}</span>
            <span className="text-sm text-muted-foreground">({book.reviewCount})</span>
          </div>
          {book.pages && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{book.pages} pages</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-card-border">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-accent">${book.price.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">${book.originalPrice!.toFixed(2)}</span>
            )}
          </div>
          {showActions && !book.inStock && (
            <Badge variant="destructive" size="sm">Out of Stock</Badge>
          )}
        </div>
      </div>
      
      {showActions && (
        <div className="p-4 md:p-5 pt-0">
          <LinkButton 
            href={`/books/${book.id}`} 
            variant="outline" 
            className="w-full justify-center mb-2"
          >
            View Details
          </LinkButton>
          <LinkButton
            href="#"
            variant="primary"
            className="w-full justify-center"
            disabled={!book.inStock}
            onClick={(e) => { e.preventDefault(); handleAddToCart(book); }}
          >
            <ShoppingCart className="w-4 h-4" aria-hidden="true" />
            Add to Cart
          </LinkButton>
        </div>
      )}
    </article>
  );
}

interface BookGridProps {
  books: Book[];
  columns?: { base: number; sm: number; md: number; lg: number; xl: number };
  variant?: "default" | "compact" | "featured";
  showActions?: boolean;
  onAddToCart?: (book: Book) => void;
  onAddToWishlist?: (book: Book) => void;
  emptyMessage?: string;
  loading?: boolean;
  loadingCount?: number;
}

export function BookGrid({ 
  books, 
  columns = { base: 1, sm: 2, md: 3, lg: 4, xl: 5 },
  variant = "default",
  showActions = true,
  onAddToCart,
  onAddToWishlist,
  emptyMessage = "No books found",
  loading = false,
  loadingCount = 8,
}: BookGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: loadingCount }).map((_, i) => (
          <BookCardSkeleton key={i} variant={variant} />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16 md:py-24">
        <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-foreground mb-2">{emptyMessage}</h3>
        <p className="text-muted-foreground">Try adjusting your search or browse our categories.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 md:gap-6 grid-cols-${columns.base} sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} xl:grid-cols-${columns.xl}`}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          variant={variant}
          showActions={showActions}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      ))}
    </div>
  );
}

function BookCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" | "featured" }) {
  if (variant === "compact") {
    return (
      <div className="card-base flex gap-4 p-3 animate-pulse">
        <div className="w-20 h-28 flex-shrink-0 rounded-lg bg-card-border" />
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-card-border rounded" />
            <div className="h-3 w-1/2 bg-card-border rounded" />
          </div>
          <div className="h-5 w-24 bg-card-border rounded" />
        </div>
      </div>
    );
  }

  return (
    <article className="card-base flex flex-col h-full animate-pulse">
      <div className="aspect-[2/3] bg-card-border" />
      <div className="p-4 md:p-5 flex flex-col flex-1 space-y-4">
        <div className="flex gap-2">
          <div className="h-5 w-20 bg-card-border rounded-full" />
          <div className="h-5 w-16 bg-card-border rounded-full" />
        </div>
        <div className="h-6 w-3/4 bg-card-border rounded" />
        <div className="h-4 w-1/2 bg-card-border rounded" />
        <div className="h-4 w-full bg-card-border rounded" />
        <div className="h-4 w-5/6 bg-card-border rounded" />
        <div className="flex items-center gap-3 pt-3 border-t border-card-border">
          <div className="h-5 w-24 bg-card-border rounded" />
          <div className="h-5 w-16 bg-card-border rounded" />
        </div>
        <div className="h-10 w-full bg-card-border rounded" />
      </div>
    </article>
  );
}