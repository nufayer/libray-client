import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  Briefcase,
  Heart,
  BookOpen,
  Globe,
  GraduationCap,
  Sun,
  CalendarHeart,
  Laptop,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "Flexible Work",
    description: "Work from anywhere. Our team is fully remote with flexible hours.",
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description: "$2,000 annual budget for courses, books, and professional development.",
  },
  {
    icon: Heart,
    title: "Health Coverage",
    description: "Comprehensive health, dental, and vision insurance for you and your family.",
  },
  {
    icon: BookOpen,
    title: "Book Allowance",
    description: "Free books from our catalog plus a $500 annual reading stipend.",
  },
  {
    icon: Sun,
    title: "Paid Time Off",
    description: "Unlimited PTO with a minimum 3-week requirement. Recharge when you need to.",
  },
  {
    icon: CalendarHeart,
    title: "Team Events",
    description: "Quarterly retreats, book clubs, and regular team bonding activities.",
  },
];

const positions = [
  {
    title: "Software Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Build and scale the platform that connects readers with their next favorite book. Work with Next.js, Node.js, and PostgreSQL.",
  },
  {
    title: "Content Curator",
    department: "Editorial",
    location: "Remote",
    type: "Full-time",
    description:
      "Shape our catalog and editorial voice. Review titles, write recommendations, and help readers discover great books.",
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description:
      "Drive growth through creative campaigns, partnerships, and community building. Own the LibRay brand across all channels.",
  },
  {
    title: "Customer Support Specialist",
    department: "Customer Experience",
    location: "Remote",
    type: "Full-time",
    description:
      "Be the voice of LibRay. Help customers with orders, recommendations, and ensuring every interaction is a positive one.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" aria-hidden="true" />
              We&apos;re Hiring
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Join Our <span className="text-accent">Team</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Help us build the future of reading. We&apos;re looking for
              passionate people who believe in the power of books.
            </p>
          </div>
        </section>

        {/* Culture */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <Card variant="elevated" padding="lg">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Our Culture
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      At LibRay, we believe the best work happens when people
                      are given autonomy, trust, and the space to do what they
                      love. Our team is distributed across time zones, united by
                      a shared love of reading and a commitment to building
                      something meaningful.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We read voraciously, debate passionately, and ship
                      thoughtfully. If you thrive in an environment where your
                      ideas matter and your impact is visible, you&apos;ll love
                      it here.
                    </p>
                  </div>
                  <div className="w-48 h-48 flex-shrink-0 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Laptop className="w-20 h-20 text-accent" aria-hidden="true" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Benefits & Perks</h2>
              <p className="section-subtitle mx-auto">
                We take care of our team so they can focus on what matters
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit) => (
                <Card key={benefit.title} variant="elevated" padding="lg">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <benefit.icon
                      className="w-6 h-6 text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Open Positions</h2>
              <p className="section-subtitle mx-auto">
                Find your role in the LibRay story
              </p>
            </div>
            <div className="space-y-4 max-w-3xl mx-auto">
              {positions.map((position) => (
                <Card key={position.title} variant="outlined" padding="lg" hover>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground mb-1">
                        {position.title}
                      </h3>
                      <p className="text-accent text-sm font-medium mb-2">
                        {position.department}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {position.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                          {position.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="btn-primary inline-flex items-center gap-2 whitespace-nowrap self-start"
                    >
                      Apply
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container text-center max-w-2xl mx-auto">
            <h2 className="section-title mb-4">
              Don&apos;t See Your Role?
            </h2>
            <p className="text-muted-foreground mb-8">
              We&apos;re always looking for talented people. Send us your
              resume and tell us how you&apos;d contribute to LibRay.
            </p>
            <Link
              href="mailto:careers@libray.com"
              className="btn-primary inline-flex items-center gap-2"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
