"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { BookCard, BookGrid } from "@/components/BookCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/Button";
import Link from "next/link";
import { BookOpen, Sparkles, Truck, Shield, Headphones, ArrowRight, Star, Tag, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

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
  isFeatured?: boolean;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  bookCount: number;
}

const features = [
  { icon: BookOpen, title: "Vast Collection", description: "Over 1M+ titles across all genres and categories" },
  { icon: Sparkles, title: "Personalized Picks", description: "AI-powered recommendations tailored to your taste" },
  { icon: Truck, title: "Fast Delivery", description: "Free shipping on orders over $50, delivered in 2-3 days" },
  { icon: Shield, title: "Secure Checkout", description: "100% secure payment processing with encryption" },
  { icon: Headphones, title: "24/7 Support", description: "Dedicated customer support team always ready to help" },
  { icon: Star, title: "Reader Reviews", description: "Honest reviews from millions of verified readers" },
];

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [booksRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/api/books/featured?limit=8`),
          fetch(`${API_URL}/api/categories`),
        ]);
        const booksData = await booksRes.json();
        const categoriesData = await categoriesRes.json();
        setFeaturedBooks(booksData.books || []);
        setCategories(categoriesData.categories || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-16 md:py-24" aria-labelledby="categories-heading">
          <div className="section-container">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <h2 id="categories-heading" className="section-title">Browse by Category</h2>
                <p className="section-subtitle">Explore our curated collection organized by genre and topic</p>
              </div>
              <Link href="/categories" className="btn-outline self-start sm:self-end">
                View All Categories
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4" role="list" aria-label="Featured categories">
              {categories.slice(0, 8).map((category) => (
                <article key={category._id} className="card-base card-hover p-5 text-center group" role="listitem">
                  <Link href={`/categories/${category.slug}`} className="block" aria-label={`Browse ${category.name} books`}>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <BookOpen className="w-7 h-7 text-accent" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.bookCount.toLocaleString()} books</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50" aria-labelledby="featured-heading">
          <div className="section-container">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <h2 id="featured-heading" className="section-title">Featured Books</h2>
                <p className="section-subtitle">Hand-picked recommendations from our editorial team</p>
              </div>
              <Link href="/books" className="btn-outline self-start sm:self-end">
                Browse All Books
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <BookGrid
              books={featuredBooks.map((book) => ({ ...book, id: book._id }))}
              columns={{ base: 1, sm: 2, md: 4, lg: 4, xl: 4 }}
              variant="default"
              showActions={true}
            />
          </div>
        </section>

        <section className="py-16 md:py-24" aria-labelledby="features-heading">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="features-heading" className="section-title">Why Choose LibRay?</h2>
              <p className="section-subtitle mx-auto">Everything you need for the perfect reading experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, i) => (
                <Card key={i} variant="elevated" padding="lg" className="text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50" aria-labelledby="newsletter-heading">
          <div className="section-container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 id="newsletter-heading" className="section-title">Stay Updated</h2>
              <p className="section-subtitle mx-auto mb-8">Get the latest book recommendations, exclusive deals, and reading tips delivered to your inbox.</p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/newsletter" method="POST">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="input-field flex-1"
                  aria-label="Email address"
                />
                <Button type="submit" variant="primary" className="whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">No spam, unsubscribe anytime. See our <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
