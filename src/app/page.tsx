"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { BookCard, BookGrid } from "@/components/BookCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/Button";
import Link from "next/link";
import { BookOpen, Sparkles, Truck, Shield, Headphones, ArrowRight, Star, Tag, ChevronRight, Search, ShoppingCart, Package, Quote, BookMarked, Users, TrendingUp, Award } from "lucide-react";
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

const howItWorks = [
  { step: 1, icon: Search, title: "Browse & Discover", description: "Explore our vast collection by genre, author, or search for your next favorite read." },
  { step: 2, icon: ShoppingCart, title: "Add to Cart", description: "Found something you love? Add it to your cart and review your selections." },
  { step: 3, icon: Package, title: "Get Delivered", description: "Place your order and enjoy fast, free delivery right to your doorstep." },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Avid Reader",
    rating: 5,
    text: "LibRay has completely transformed my reading experience. The selection is incredible and the recommendations are spot-on. I've discovered so many amazing books here!",
    avatar: "S",
  },
  {
    name: "James Chen",
    role: "Book Collector",
    rating: 5,
    text: "As someone who buys a lot of books, LibRay's prices and fast delivery keep me coming back. The quality is always excellent and customer service is top-notch.",
    avatar: "J",
  },
  {
    name: "Emily Rodriguez",
    role: "Literature Student",
    rating: 5,
    text: "The best online bookstore I've used. Easy to navigate, great prices, and I always receive my orders on time. Highly recommended for any book lover!",
    avatar: "E",
  },
];

const readingStats = [
  { value: "50K+", label: "Happy Readers", icon: Users },
  { value: "100K+", label: "Books Sold", icon: BookMarked },
  { value: "4.9", label: "Average Rating", icon: Star },
  { value: "99%", label: "Satisfaction Rate", icon: TrendingUp },
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

        {/* How It Works */}
        <section className="py-16 md:py-24" aria-labelledby="how-heading">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="how-heading" className="section-title">How It Works</h2>
              <p className="section-subtitle mx-auto">Getting your next great read is just three simple steps away</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {howItWorks.map((step) => (
                <div key={step.step} className="text-center relative">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-accent/10 flex items-center justify-center relative">
                    <step.icon className="w-8 h-8 text-accent" aria-hidden="true" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-primary-dark text-sm font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book of the Month */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50" aria-labelledby="botm-heading">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <Award className="w-4 h-4" aria-hidden="true" />
                Book of the Month
              </div>
              <h2 id="botm-heading" className="section-title">The Midnight Library</h2>
              <p className="section-subtitle mx-auto">By Matt Haig</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card variant="elevated" padding="lg">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-48 h-72 flex-shrink-0 rounded-xl overflow-hidden bg-primary-dark shadow-2xl">
                    <img
                      src="/books/midnight-library.jpg"
                      alt="The Midnight Library by Matt Haig"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-5 h-5 ${s <= 5 ? "text-amber-400 fill-current" : "text-muted-foreground"}`} />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">5.0 (12,450 reviews)</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. A beautiful meditation on the power of second chances and the choices that make life worth living.
                    </p>
                    <div className="flex items-center gap-4 justify-center md:justify-start">
                      <span className="text-2xl font-bold text-accent">$14.99</span>
                      <span className="text-lg text-muted-foreground line-through">$19.99</span>
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">25% Off</span>
                    </div>
                    <Link href="/books" className="btn-primary inline-flex items-center gap-2 mt-6">
                      Shop Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
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

        {/* Reading Stats */}
        <section className="py-16 md:py-24" aria-labelledby="stats-heading">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 id="stats-heading" className="section-title">LibRay by the Numbers</h2>
              <p className="section-subtitle mx-auto">Trusted by readers everywhere</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {readingStats.map((stat, i) => (
                <Card key={i} variant="elevated" padding="lg" className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-accent" aria-hidden="true" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50" aria-labelledby="testimonials-heading">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 id="testimonials-heading" className="section-title">What Our Readers Say</h2>
              <p className="section-subtitle mx-auto">Join thousands of happy book lovers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <Card key={i} variant="elevated" padding="lg" className="flex flex-col">
                  <Quote className="w-8 h-8 text-accent/30 mb-4" aria-hidden="true" />
                  <p className="text-muted-foreground leading-relaxed flex-1 mb-6">&quot;{t.text}&quot;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-card-border">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-bold text-sm">{t.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>
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
