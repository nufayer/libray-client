import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  Newspaper,
  Download,
  Mail,
  ArrowRight,
  Calendar,
  ExternalLink,
  FileText,
  Image,
} from "lucide-react";

const pressReleases = [
  {
    date: "March 12, 2026",
    title: "LibRay Surpasses 50,000 Active Readers",
    excerpt:
      "Just two years after launch, LibRay reaches a major milestone with over 50,000 monthly active readers and a catalog of 500,000+ titles.",
    tag: "Milestone",
  },
  {
    date: "January 8, 2026",
    title: "LibRay Launches AI-Powered Reading Recommendations",
    excerpt:
      "New machine learning system analyzes reading habits to deliver hyper-personalized book suggestions, boosting discovery rates by 40%.",
    tag: "Product",
  },
  {
    date: "October 22, 2025",
    title: "LibRay Partners with Independent Publishers Collective",
    excerpt:
      "Strategic partnership brings 10,000+ indie titles to the platform, supporting independent publishing and expanding reader choice.",
    tag: "Partnership",
  },
];

const pressKitItems = [
  {
    icon: Image,
    title: "Brand Logos",
    description:
      "Official LibRay logos in SVG, PNG, and EPS formats for print and digital use.",
  },
  {
    icon: FileText,
    title: "Brand Guidelines",
    description:
      "Color palette, typography, logo usage rules, and brand voice documentation.",
  },
  {
    icon: Newspaper,
    title: "Fact Sheet",
    description:
      "Company overview, key statistics, founding story, and leadership bios.",
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <Newspaper className="w-4 h-4" aria-hidden="true" />
              Press & Media
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Press <span className="text-accent">&</span> Media
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Resources, press releases, and media materials for journalists,
              bloggers, and content creators.
            </p>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title mb-8">Press Releases</h2>
              <div className="space-y-6">
                {pressReleases.map((release) => (
                  <Card key={release.title} variant="elevated" padding="lg" hover>
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                        <Calendar
                          className="w-4 h-4"
                          aria-hidden="true"
                        />
                        {release.date}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                            {release.tag}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-foreground mb-2">
                          {release.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {release.excerpt}
                        </p>
                      </div>
                      <Link
                        href="#"
                        className="btn-outline inline-flex items-center gap-2 whitespace-nowrap self-start text-sm"
                      >
                        Read More
                        <ExternalLink
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Media Kit */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Media Kit</h2>
              <p className="section-subtitle mx-auto">
                Download official brand assets and company information
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {pressKitItems.map((item) => (
                <Card key={item.title} variant="elevated" padding="lg" className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                    <item.icon
                      className="w-7 h-7 text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <Link
                    href="#"
                    className="btn-outline inline-flex items-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    Download
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Press Contact */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="max-w-2xl mx-auto">
              <Card variant="elevated" padding="lg">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Mail
                      className="w-7 h-7 text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    Press Contact
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    For press inquiries, interview requests, or media
                    partnerships, reach out to our communications team.
                  </p>
                  <a
                    href="mailto:press@libray.com"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    press@libray.com
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <p className="text-sm text-muted-foreground mt-4">
                    We aim to respond within 24 hours on business days.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
