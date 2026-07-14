import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  Handshake,
  Search,
  Link as LinkIcon,
  DollarSign,
  ArrowRight,
  BarChart3,
  Wallet,
  Megaphone,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    step: 1,
    title: "Apply to Join",
    description:
      "Submit your application with details about your platform, audience, and how you plan to promote LibRay.",
  },
  {
    icon: LinkIcon,
    step: 2,
    title: "Share Your Link",
    description:
      "Get your unique affiliate link and share it with your audience through blog posts, social media, or email.",
  },
  {
    icon: DollarSign,
    step: 3,
    title: "Earn Commissions",
    description:
      "Earn money every time someone purchases through your link. Track everything in your affiliate dashboard.",
  },
];

const benefits = [
  {
    icon: DollarSign,
    title: "10% Commission",
    description:
      "Earn 10% on every sale driven through your affiliate link. One of the highest rates in the industry.",
  },
  {
    icon: BarChart3,
    title: "30-Day Cookie",
    description:
      "Your referrals are tracked for 30 days. If they buy anytime within that window, you get credit.",
  },
  {
    icon: Wallet,
    title: "Monthly Payouts",
    description:
      "Get paid reliably every month via direct deposit, PayPal, or bank transfer. No minimum threshold.",
  },
  {
    icon: Megaphone,
    title: "Marketing Materials",
    description:
      "Access banners, email templates, social media copy, and exclusive promotional content.",
  },
];

export default function AffiliatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <Handshake className="w-4 h-4" aria-hidden="true" />
              Partner With Us
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Affiliate <span className="text-accent">Program</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Share your love of books and earn money doing it. Join our
              affiliate program and earn commissions on every sale you refer.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle mx-auto">
                Three simple steps to start earning
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
              {steps.map((step) => (
                <div key={step.step} className="text-center relative">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-accent/10 flex items-center justify-center relative">
                    <step.icon
                      className="w-8 h-8 text-accent"
                      aria-hidden="true"
                    />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-primary-dark text-sm font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Affiliate Benefits</h2>
              <p className="section-subtitle mx-auto">
                Everything you need to succeed as a LibRay affiliate
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit) => (
                <Card key={benefit.title} variant="elevated" padding="lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon
                        className="w-6 h-6 text-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <Card variant="elevated" padding="lg">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Who Can Join?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We welcome anyone with an audience that loves books. Our
                  affiliates include book bloggers, BookTubers, Bookstagrammers,
                  podcasters, educators, and content creators of all sizes.
                </p>
                <ul className="space-y-3">
                  {[
                    "Active blog, YouTube channel, podcast, or social media presence",
                    "Genuine interest in books and reading",
                    "Ability to create quality content",
                    "Agreement to our affiliate terms and guidelines",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <CheckCircle
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container text-center max-w-2xl mx-auto">
            <h2 className="section-title mb-4">Ready to Start Earning?</h2>
            <p className="text-muted-foreground mb-8">
              Apply today and start turning your passion for books into income.
              Most applications are reviewed within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="btn-primary inline-flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="mailto:affiliates@libray.com"
                className="btn-outline inline-flex items-center gap-2"
              >
                Questions? Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
