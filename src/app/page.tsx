import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { BookCard, BookGrid } from "@/components/BookCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/Button";
import Link from "next/link";
import { BookOpen, Sparkles, Truck, Shield, Headphones, ArrowRight, Star, Tag, ChevronRight } from "lucide-react";

const featuredBooks = [
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
];

const features = [
  { icon: BookOpen, title: "Vast Collection", description: "Over 1M+ titles across all genres and categories" },
  { icon: Sparkles, title: "Personalized Picks", description: "AI-powered recommendations tailored to your taste" },
  { icon: Truck, title: "Fast Delivery", description: "Free shipping on orders over $50, delivered in 2-3 days" },
  { icon: Shield, title: "Secure Checkout", description: "100% secure payment processing with encryption" },
  { icon: Headphones, title: "24/7 Support", description: "Dedicated customer support team always ready to help" },
  { icon: Star, title: "Reader Reviews", description: "Honest reviews from millions of verified readers" },
];

const categories = [
  { id: "fiction", name: "Fiction", bookCount: 245000, icon: "BookOpen", description: "Literary, contemporary, and classic fiction", subcategories: ["Literary", "Contemporary", "Classics", "Short Stories"] },
  { id: "self-help", name: "Self-Help", bookCount: 180000, icon: "Sparkles", description: "Personal development and growth", subcategories: ["Productivity", "Psychology", "Motivation", "Relationships"] },
  { id: "sci-fi", name: "Science Fiction", bookCount: 156000, icon: "BookOpen", description: "Space, future, and speculative fiction", subcategories: ["Space Opera", "Cyberpunk", "Dystopian", "Time Travel"] },
  { id: "fantasy", name: "Fantasy", bookCount: 198000, icon: "Sparkles", description: "Magic, mythology, and epic adventures", subcategories: ["High Fantasy", "Urban Fantasy", "Fairy Tales", "Mythology"] },
  { id: "mystery", name: "Mystery & Thriller", bookCount: 167000, icon: "BookOpen", description: "Suspense, crime, and psychological thrillers", subcategories: ["Crime", "Psychological", "Cozy Mystery", "Noir"] },
  { id: "romance", name: "Romance", bookCount: 134000, icon: "Sparkles", description: "Love stories in all their forms", subcategories: ["Contemporary", "Historical", "Paranormal", "Rom-Com"] },
  { id: "history", name: "History", bookCount: 112000, icon: "BookOpen", description: "Past events, biographies, and historical analysis", subcategories: ["World History", "Biographies", "Military", "Ancient"] },
  { id: "business", name: "Business & Finance", bookCount: 98000, icon: "Sparkles", description: "Investing, entrepreneurship, and economics", subcategories: ["Investing", "Leadership", "Economics", "Startups"] },
];

export default function Home() {
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
                <article key={category.id} className="card-base card-hover p-5 text-center group" role="listitem">
                  <Link href={`/categories/${category.id}`} className="block" aria-label={`Browse ${category.name} books`}>
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
              books={featuredBooks}
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