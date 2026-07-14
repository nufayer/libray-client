"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, BookOpen, Truck, Shield, Headphones, MessageSquare, Globe, Heart, Users } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

const socialLinks = [
  { icon: Globe, href: "https://www.linkedin.com/in/nufayer-mahmud009", label: "LinkedIn" },
  { icon: BookOpen, href: "https://github.com/nufayer", label: "GitHub" },
  { icon: MessageSquare, href: "https://www.facebook.com/nufayer.mahmud", label: "Facebook" },
];

const contactInfo = [
  { icon: MapPin, text: "123 Book Street, Library District, NY 10001" },
  { icon: Phone, text: "+1 (555) 123-4567" },
  { icon: Mail, text: "support@libray.com" },
];

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
    { href: "/blog", label: "Blog" },
    { href: "/affiliates", label: "Affiliates" },
  ],
  support: [
    { href: "/help", label: "Help Center" },
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns Policy" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/accessibility", label: "Accessibility" },
  ],
  account: [
    { href: "/login", label: "Sign In" },
    { href: "/register", label: "Create Account" },
    { href: "/orders", label: "My Orders" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/profile", label: "Profile Settings" },
  ],
};

const features = [
  { icon: BookOpen, title: "Vast Collection", desc: "Over 1M+ titles across all genres" },
  { icon: Truck, title: "Fast Delivery", desc: "Free shipping on orders over $50" },
  { icon: Shield, title: "Secure Payment", desc: "100% secure checkout guaranteed" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated support team" },
];

export function Footer() {
  return (
    <footer className="bg-primary-dark border-t border-border mt-auto">
      <div className="section-container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-accent hover:opacity-80 transition-opacity" aria-label="LibRay Home">
              <span className="text-3xl font-bold gradient-text">LibRay</span>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xs">
              Your trusted digital bookstore with over a million titles. Discover, read, and own the books you love.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-card-hover transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav className="space-y-4" aria-label="Company">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="space-y-4" aria-label="Support">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="space-y-4" aria-label="Legal">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="space-y-4" aria-label="Account">
            <h3 className="font-semibold text-foreground">My Account</h3>
            <ul className="space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4" aria-label="Contact & Features">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <address className="not-italic space-y-3 text-sm text-muted-foreground">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-accent/70" aria-hidden="true" />
                  <span>{item.text}</span>
                </div>
              ))}
            </address>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-card-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-card-border/50">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} LibRay. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-accent transition-colors">Terms</Link>
              <Link href="/cookies" className="hover:text-accent transition-colors">Cookies</Link>
              <span className="text-card-border mx-1" aria-hidden="true">|</span>
              <span>Made with Next.js & TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}