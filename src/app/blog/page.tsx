import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { BookOpen, ArrowRight, Clock, Tag } from "lucide-react";

const categories = ["All", "Reading Tips", "Book Reviews", "Author Interviews", "Industry News"];

const posts = [
  {
    title: "10 Books That Will Change How You Think About Money",
    excerpt:
      "From behavioral economics to timeless wisdom, these titles will reshape your relationship with finances.",
    date: "July 8, 2026",
    category: "Reading Tips",
    readTime: "6 min read",
  },
  {
    title: "Review: 'The Midnight Library' by Matt Haig",
    excerpt:
      "A beautifully written exploration of regret, possibility, and the lives we might have lived. Our full review inside.",
    date: "July 2, 2026",
    category: "Book Reviews",
    readTime: "4 min read",
  },
  {
    title: "In Conversation with Carmen Maria Machado",
    excerpt:
      "The award-winning author discusses her creative process, genre-bending fiction, and the power of speculative storytelling.",
    date: "June 25, 2026",
    category: "Author Interviews",
    readTime: "8 min read",
  },
  {
    title: "Why Physical Books Are Making a Comeback",
    excerpt:
      "In an age of screens, print sales continue to grow. We explore the tactile appeal of paperbacks and hardcovers.",
    date: "June 18, 2026",
    category: "Industry News",
    readTime: "5 min read",
  },
  {
    title: "How to Build a Reading Habit That Sticks",
    excerpt:
      "Practical strategies for fitting more reading into your daily routine, backed by science and real reader stories.",
    date: "June 11, 2026",
    category: "Reading Tips",
    readTime: "7 min read",
  },
  {
    title: "The Best Literary Fiction of 2026 So Far",
    excerpt:
      "Our editors pick the most compelling novels released in the first half of the year, from debuts to literary heavyweights.",
    date: "June 4, 2026",
    category: "Book Reviews",
    readTime: "5 min read",
  },
];

const categoryColors: Record<string, string> = {
  "Reading Tips": "bg-blue-500/10 text-blue-400",
  "Book Reviews": "bg-purple-500/10 text-purple-400",
  "Author Interviews": "bg-amber-500/10 text-amber-400",
  "Industry News": "bg-emerald-500/10 text-emerald-400",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              Blog
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              The LibRay <span className="text-accent">Blog</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Book recommendations, reading tips, author conversations, and
              everything happening in the world of literature.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border/50">
          <div className="section-container">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    i === 0
                      ? "bg-accent text-primary-dark"
                      : "bg-card border border-card-border text-muted-foreground hover:text-foreground hover:border-accent/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.title} variant="elevated" padding="none" hover className="flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-primary-light/40 to-accent/10 flex items-center justify-center">
                    <BookOpen
                      className="w-12 h-12 text-accent/40"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          categoryColors[post.category] ||
                          "bg-accent/10 text-accent"
                        }`}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-card-border/50">
                      <span className="text-xs text-muted-foreground">
                        {post.date}
                      </span>
                      <Link
                        href="#"
                        className="text-accent text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Read
                        <ArrowRight
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container text-center max-w-2xl mx-auto">
            <h2 className="section-title mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-8">
              Get the latest blog posts, book recommendations, and reading tips
              delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="input-field flex-1"
                aria-label="Email address"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
