import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { BookOpen, Heart, Users, Leaf, ArrowRight, Mail } from "lucide-react";

const values = [
  {
    icon: BookOpen,
    title: "Curated Selection",
    description:
      "Every book in our collection is carefully chosen by our editorial team. We prioritize quality over quantity, ensuring you always find something worth reading.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "From personalized recommendations to hassle-free returns, every decision we make starts with the question: how does this help our readers?",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Reading is better together. We foster a vibrant community of book lovers through reading clubs, author events, and shared reviews.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We partner with eco-friendly publishers and use recyclable packaging. Great books shouldn't cost the earth.",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    initials: "SC",
    bio: "Lifelong reader and former publishing executive who left corporate to build a bookstore that truly serves readers.",
  },
  {
    name: "James Rivera",
    role: "Head of Content",
    initials: "JR",
    bio: "Literature PhD turned curator. James leads our editorial team and personally reviews hundreds of titles each year.",
  },
  {
    name: "Maya Patel",
    role: "Customer Experience",
    initials: "MP",
    bio: "Passionate about making every interaction delightful. Maya built our support team from the ground up.",
  },
  {
    name: "Alex Kim",
    role: "Tech Lead",
    initials: "AK",
    bio: "Full-stack engineer obsessed with performance and accessibility. Turns our book-loving ideas into seamless digital experiences.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              Our Story
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              About <span className="text-accent">LibRay</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded in 2024, LibRay was born from a simple idea: everyone
              deserves access to great books.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <Card variant="elevated" padding="lg">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Our Mission
                  </h2>
                  <p className="text-xl text-accent font-medium mb-4">
                    To make reading accessible, affordable, and enjoyable for
                    everyone.
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    We believe books have the power to transform lives. That
                    drives us to build the best possible platform for discovering,
                    purchasing, and enjoying literature — whether you&apos;re a
                    casual reader or a lifelong bibliophile.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Our Values</h2>
              <p className="section-subtitle mx-auto">
                The principles that guide every decision we make
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((value) => (
                <Card key={value.title} variant="elevated" padding="lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <value.icon
                        className="w-6 h-6 text-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Meet the Team</h2>
              <p className="section-subtitle mx-auto">
                The people behind LibRay
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <Card key={member.name} variant="elevated" padding="lg" className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/15 flex items-center justify-center">
                    <span className="text-accent font-bold text-xl">
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm text-accent mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container text-center max-w-2xl mx-auto">
            <h2 className="section-title mb-4">Join the LibRay Community</h2>
            <p className="text-muted-foreground mb-8">
              Whether you&apos;re looking for your next great read or want to be
              part of our team, we&apos;d love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/books" className="btn-primary inline-flex items-center gap-2">
                Browse Books
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/careers" className="btn-outline inline-flex items-center gap-2">
                View Careers
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
