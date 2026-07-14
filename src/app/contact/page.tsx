"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Globe,
  Heart,
  Users,
  ArrowRight,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@libray.com",
    description: "We respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+1 (555) 123-4567",
    description: "Mon-Fri 9AM-6PM EST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "123 Book Street, Library District",
    description: "New York, NY 10001",
  },
  {
    icon: Clock,
    title: "Office Hours",
    detail: "Mon-Fri 9AM-6PM EST",
    description: "Closed on weekends",
  },
];

const socialLinks = [
  { icon: Globe, label: "LinkedIn", href: "https://www.linkedin.com/in/nufayer-mahmud009" },
  { icon: Heart, label: "GitHub", href: "https://github.com/nufayer" },
  { icon: Users, label: "Facebook", href: "https://www.facebook.com/nufayer.mahmud" },
];

const subjects = [
  "General Inquiry",
  "Order Support",
  "Account Issues",
  "Shipping Question",
  "Return Request",
  "Partnership",
  "Press Inquiry",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              Contact
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Get in <span className="text-accent">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have a question, suggestion, or just want to say hello? We&apos;d
              love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-b border-border/50">
          <div className="section-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {contactInfo.map((info) => (
                <Card key={info.title} variant="elevated" padding="lg" className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <info.icon
                      className="w-6 h-6 text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">
                    {info.title}
                  </h3>
                  <p className="text-accent text-sm font-medium mb-1">
                    {info.detail}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {info.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
              {/* Form */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we&apos;ll get back to you as
                  soon as possible.
                </p>

                {submitted && (
                  <Card variant="elevated" padding="md" className="mb-6 border-accent/30 bg-accent/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <Send className="w-4 h-4 text-accent" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          Message Sent!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          We&apos;ll get back to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  </Card>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="input-field w-full"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input-field w-full"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="input-field w-full"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="input-field w-full resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Send Message
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                <Card variant="elevated" padding="lg">
                  <h3 className="font-bold text-lg text-foreground mb-4">
                    Other Ways to Reach Us
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail
                        className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          Email
                        </p>
                        <p className="text-muted-foreground text-sm">
                          support@libray.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone
                        className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          Phone
                        </p>
                        <p className="text-muted-foreground text-sm">
                          +1 (555) 123-4567
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin
                        className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          Address
                        </p>
                        <p className="text-muted-foreground text-sm">
                          123 Book Street
                          <br />
                          Library District
                          <br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card variant="elevated" padding="lg">
                  <h3 className="font-bold text-lg text-foreground mb-4">
                    Follow Us
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Stay connected on social media for updates, recommendations,
                    and behind-the-scenes content.
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </Card>

                <Card variant="elevated" padding="lg">
                  <h3 className="font-bold text-lg text-foreground mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/faq"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-card/80 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <span className="text-sm">FAQ</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/shipping"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-card/80 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <span className="text-sm">Shipping Info</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/returns"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-card/80 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <span className="text-sm">Returns Policy</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
