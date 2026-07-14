"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  HelpCircle,
  Search,
  BookOpen,
  CreditCard,
  Package,
  BookMarked,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  Mail,
} from "lucide-react";

const topics = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Learn the basics of using LibRay",
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "Click the Sign Up button in the top right corner. You can register using your email address or sign in with Google/Apple. Once verified, you'll have full access to your personalized dashboard.",
      },
      {
        question: "How do I browse and search for books?",
        answer:
          "Use the search bar at the top of any page to search by title, author, or ISBN. You can also browse curated collections on the homepage or explore our category pages for genre-specific recommendations.",
      },
      {
        question: "Can I create reading lists?",
        answer:
          "Yes! Navigate to any book and click the 'Add to List' button. You can create multiple custom lists such as 'Want to Read', 'Currently Reading', and 'Finished'. Access all your lists from your profile dashboard.",
      },
      {
        question: "How do personalized recommendations work?",
        answer:
          "Our recommendation engine analyzes your reading history, ratings, and list preferences to suggest books you'll love. The more you interact with the platform, the better your recommendations become.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Account & Billing",
    description: "Manage your account settings and payments",
    faqs: [
      {
        question: "How do I update my payment method?",
        answer:
          "Go to your Account Settings > Payment Methods. You can add, remove, or set a default payment method. We accept all major credit cards, PayPal, and Apple Pay.",
      },
      {
        question: "Can I get a refund on a digital purchase?",
        answer:
          "Digital purchases can be refunded within 14 days of purchase if you haven't accessed more than 10% of the content. Contact our support team with your order number for assistance.",
      },
      {
        question: "How do I cancel my subscription?",
        answer:
          "Navigate to Account Settings > Subscription and click 'Manage Subscription'. You can cancel at any time. Your access continues until the end of your current billing period.",
      },
    ],
  },
  {
    icon: Package,
    title: "Orders & Shipping",
    description: "Track orders and understand shipping options",
    faqs: [
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive a confirmation email with a tracking number. You can also view tracking information in your Orders page under your account dashboard.",
      },
      {
        question: "What shipping options are available?",
        answer:
          "We offer Standard (5-7 business days, free over $50), Express (2-3 business days, $9.99), and Overnight (1 business day, $19.99) shipping within the US. International shipping rates vary by destination.",
      },
      {
        question: "Can I change my order after placing it?",
        answer:
          "Orders can be modified within 2 hours of placement. After that, the order enters processing and cannot be changed. Visit your Orders page to check if modification is still available.",
      },
    ],
  },
  {
    icon: BookMarked,
    title: "Books & Reading",
    description: "Everything about our book collection and features",
    faqs: [
      {
        question: "Do you sell e-books?",
        answer:
          "Yes, we offer thousands of titles in digital format. Browse our e-book catalog and read in our built-in reader or download to your favorite device. Purchased e-books are available across all your devices.",
      },
      {
        question: "How do I return a physical book?",
        answer:
          "Physical books can be returned within 30 days of delivery if they're in original condition. Initiate a return from your Orders page and follow the provided instructions. See our Returns Policy for full details.",
      },
      {
        question: "Are signed editions available?",
        answer:
          "We periodically offer signed editions from popular authors. Sign up for our newsletter to be notified when limited signed editions become available.",
      },
    ],
  },
  {
    icon: AlertTriangle,
    title: "Technical Issues",
    description: "Troubleshoot common technical problems",
    faqs: [
      {
        question: "The website isn't loading properly. What should I do?",
        answer:
          "First, try clearing your browser cache and cookies. If the issue persists, disable browser extensions and try again. You can also try a different browser or use incognito mode. Contact support if problems continue.",
      },
      {
        question: "I can't log into my account.",
        answer:
          "Verify you're using the correct email and password. Use the 'Forgot Password' link to reset your password. If you signed up with Google/Apple, use those sign-in options instead. Contact support if you're still locked out.",
      },
      {
        question: "My payment was declined. What now?",
        answer:
          "Ensure your card details are correct and the card hasn't expired. Check with your bank that the transaction wasn't blocked for security reasons. Try an alternative payment method if the issue persists.",
      },
      {
        question: "How do I report a bug?",
        answer:
          "You can report bugs through the 'Report an Issue' link in the footer or by emailing support@libray.com. Please include your browser, device, and a description of what happened. Screenshots are very helpful.",
      },
    ],
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqs, setOpenFaqs] = useState<Record<string, number | null>>({});

  const toggleFaq = (topicTitle: string, faqIndex: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [topicTitle]: prev[topicTitle] === faqIndex ? null : faqIndex,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" aria-hidden="true" />
              Support
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Help <span className="text-accent">Center</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Find answers to common questions and get the help you need.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-12 py-4 text-lg rounded-xl"
                aria-label="Search for help"
              />
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Popular Topics</h2>
              <p className="section-subtitle mx-auto">
                Browse by category or search above
              </p>
            </div>
            <div className="space-y-8 max-w-4xl mx-auto">
              {topics.map((topic) => {
                const filteredFaqs = topic.faqs.filter(
                  (faq) =>
                    !searchQuery ||
                    faq.question
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (searchQuery && filteredFaqs.length === 0) return null;

                return (
                  <Card key={topic.title} variant="elevated" padding="lg">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <topic.icon
                          className="w-6 h-6 text-accent"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-foreground">
                          {topic.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {filteredFaqs.map((faq, faqIndex) => (
                        <div
                          key={faqIndex}
                          className="border border-card-border/50 rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleFaq(topic.title, faqIndex)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-card/80 transition-colors"
                            aria-expanded={openFaqs[topic.title] === faqIndex}
                          >
                            <span className="font-medium text-foreground pr-4">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                                openFaqs[topic.title] === faqIndex
                                  ? "rotate-180"
                                  : ""
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                          {openFaqs[topic.title] === faqIndex && (
                            <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-card-border/50 pt-3">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container text-center max-w-2xl mx-auto">
            <h2 className="section-title mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-8">
              Our support team is ready to assist you with any questions or
              issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Contact Support
              </Link>
              <Link
                href="/faq"
                className="btn-outline inline-flex items-center gap-2"
              >
                Browse FAQ
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
