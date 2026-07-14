"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShoppingBag,
  User,
  Truck,
  RotateCcw,
  CreditCard,
} from "lucide-react";

const categories = [
  { id: "all", label: "All Questions" },
  { id: "orders", label: "Orders" },
  { id: "account", label: "Account" },
  { id: "shipping", label: "Shipping" },
  { id: "returns", label: "Returns" },
  { id: "payments", label: "Payments" },
];

const faqs = [
  // Orders
  {
    category: "orders",
    question: "How do I place an order?",
    answer:
      "Browse our catalog, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details. Once confirmed, you'll receive an order confirmation email.",
  },
  {
    category: "orders",
    question: "Can I modify or cancel my order?",
    answer:
      "Orders can be modified or canceled within 2 hours of placement. After that, orders enter processing and cannot be changed. Visit your Orders page to check if modification is still available.",
  },
  {
    category: "orders",
    question: "How do I check my order status?",
    answer:
      "Log into your account and navigate to the Orders page. You'll see real-time status updates including when your order is being processed, shipped, and delivered.",
  },
  // Account
  {
    category: "account",
    question: "How do I create an account?",
    answer:
      "Click the Sign Up button in the top right corner. You can register with your email address or use Google/Apple sign-in. After verification, you'll have full access to your personalized dashboard.",
  },
  {
    category: "account",
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot Password' on the login page. Enter your email address and we'll send you a reset link. The link expires after 24 hours. If you don't receive the email, check your spam folder.",
  },
  {
    category: "account",
    question: "Can I change my email address?",
    answer:
      "Yes, go to Account Settings > Profile and update your email address. You'll need to verify the new email before the change takes effect.",
  },
  {
    category: "account",
    question: "How do I delete my account?",
    answer:
      "Contact our support team to request account deletion. Please note this action is irreversible and all your data, including order history and reading lists, will be permanently removed.",
  },
  // Shipping
  {
    category: "shipping",
    question: "What shipping methods are available?",
    answer:
      "We offer Standard (5-7 business days, free over $50), Express (2-3 business days, $9.99), and Overnight (1 business day, $19.99) shipping within the US. International rates vary by destination.",
  },
  {
    category: "shipping",
    question: "Is free shipping available?",
    answer:
      "Yes! Standard shipping is free on all domestic orders over $50. Simply add items totaling $50 or more to your cart and the free shipping option will be applied automatically at checkout.",
  },
  {
    category: "shipping",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to over 50 countries. International shipping rates are calculated at checkout based on destination and package weight. Delivery typically takes 7-14 business days.",
  },
  // Returns
  {
    category: "returns",
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of delivery. Items must be in their original condition — unused, undamaged, and with all packaging intact. E-books and digital content are non-refundable after access.",
  },
  {
    category: "returns",
    question: "How do I initiate a return?",
    answer:
      "Log into your account, go to Orders, and select the item you want to return. Click 'Request Return' and follow the instructions. You'll receive a prepaid shipping label via email.",
  },
  {
    category: "returns",
    question: "How long do refunds take?",
    answer:
      "Once we receive your return, processing takes 3-5 business days. The refund will be credited to your original payment method within 5-10 additional business days depending on your bank.",
  },
  {
    category: "returns",
    question: "Can I exchange an item instead of returning it?",
    answer:
      "Yes, you can request an exchange when initiating your return. Select 'Exchange' and choose the replacement item. Exchanges are subject to availability and we'll ship the new item once we receive the return.",
  },
  // Payments
  {
    category: "payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are encrypted and secure.",
  },
  {
    category: "payments",
    question: "Is my payment information secure?",
    answer:
      "Absolutely. We use industry-standard SSL encryption and PCI-compliant payment processing. We never store your full card number on our servers. All payment data is handled by our secure payment partners.",
  },
  {
    category: "payments",
    question: "Can I use multiple payment methods?",
    answer:
      "Currently, we only support one payment method per order. However, you can use gift cards in combination with another payment method. Gift cards can be applied at checkout.",
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
              Frequently Asked <span className="text-accent">Questions</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Find quick answers to the most common questions about LibRay.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-border/50">
          <div className="section-container">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-accent text-primary-dark"
                      : "bg-card border border-card-border text-muted-foreground hover:text-foreground hover:border-accent/30"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => {
                  const globalIndex = faqs.indexOf(faq);
                  return (
                    <Card
                      key={globalIndex}
                      variant="outlined"
                      padding="none"
                    >
                      <button
                        onClick={() => toggleFaq(globalIndex)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-card/50 transition-colors"
                        aria-expanded={openIndex === globalIndex}
                      >
                        <span className="font-medium text-foreground pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                            openIndex === globalIndex ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {openIndex === globalIndex && (
                        <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-card-border/50 pt-4">
                          {faq.answer}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>

              {filteredFaqs.length === 0 && (
                <Card variant="elevated" padding="lg" className="text-center">
                  <p className="text-muted-foreground">
                    No questions found in this category.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container text-center max-w-2xl mx-auto">
            <h2 className="section-title mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8">
              Can&apos;t find the answer you&apos;re looking for? Our support
              team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/help"
                className="btn-outline inline-flex items-center gap-2"
              >
                Help Center
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
