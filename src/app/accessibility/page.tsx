import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Accessibility, ArrowRight, Mail, Check, AlertTriangle } from "lucide-react";

const features = [
  {
    title: "Screen Reader Compatible",
    description:
      "Our platform is fully compatible with popular screen readers including JAWS, NVDA, and VoiceOver. All interactive elements are properly labeled, and content is structured with semantic HTML to ensure a seamless experience for visually impaired users.",
  },
  {
    title: "Keyboard Navigation",
    description:
      "Every feature on LibRay can be accessed using only a keyboard. We provide visible focus indicators, logical tab order, and keyboard shortcuts for common actions. Skip navigation links allow users to jump directly to main content areas.",
  },
  {
    title: "Alt Text for Images",
    description:
      "All meaningful images on our platform include descriptive alternative text. Decorative images are properly hidden from assistive technologies using aria-hidden attributes to reduce unnecessary noise for screen reader users.",
  },
  {
    title: "Color Contrast",
    description:
      "We maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text, meeting WCAG AA standards. Our dark theme is carefully designed to ensure readability without causing eye strain during extended reading sessions.",
  },
  {
    title: "Responsive Design",
    description:
      "LibRay is fully responsive and accessible across all device sizes, from mobile phones to large desktop monitors. Content reflows gracefully, and touch targets are appropriately sized for all users, including those with motor impairments.",
  },
  {
    title: "Consistent Navigation",
    description:
      "Our navigation structure is consistent across all pages, with clear headings, breadcrumbs, and landmarks that help users understand where they are and how to find what they need. Search functionality is always prominently available.",
  },
];

const knownLimitations = [
  {
    issue: "Legacy PDF Catalogs",
    description:
      "Some older PDF catalogs on our platform may not be fully accessible. We are actively working to remediate these documents and provide accessible alternatives.",
  },
  {
    issue: "Third-Party Payment Widgets",
    description:
      "Payment processing forms from our third-party partners may have accessibility limitations outside our direct control. We work closely with these partners to improve their accessibility compliance.",
  },
  {
    issue: "Complex Data Visualizations",
    description:
      "Some interactive charts and data visualizations on our analytics pages may not be fully accessible via screen readers. We provide tabular alternatives for all visual data representations.",
  },
];

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <Accessibility className="w-4 h-4" aria-hidden="true" />
              Accessibility
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Accessibility <span className="text-accent">Statement</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe everyone deserves equal access to great books. Our
              commitment to accessibility ensures that LibRay is usable by
              all readers, regardless of ability.
            </p>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <Card variant="elevated" padding="lg">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Our Commitment
                  </h2>
                  <p className="text-xl text-accent font-medium mb-4">
                    Making literature accessible to every reader, everywhere.
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    At LibRay, accessibility is not an afterthought — it is a
                    core value that shapes every decision we make. We are
                    committed to ensuring that our platform is usable by
                    people of all abilities, and we continuously work to
                    improve the experience for all users.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Accessibility Features</h2>
              <p className="section-subtitle mx-auto">
                The measures we take to ensure an inclusive experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature) => (
                <Card key={feature.title} variant="elevated" padding="lg">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-accent" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Standards Compliance */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <Card variant="elevated" padding="lg">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Standards Compliance
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We strive to conform to the Web Content Accessibility
                  Guidelines (WCAG) 2.1 at the AA level. These guidelines
                  are the internationally recognized standard for web
                  accessibility and provide a framework for making content
                  accessible to a wider range of people with disabilities.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <h3 className="font-bold text-accent mb-1">Level AA</h3>
                    <p className="text-sm text-muted-foreground">
                      Our target compliance level across all platform features
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <h3 className="font-bold text-accent mb-1">WCAG 2.1</h3>
                    <p className="text-sm text-muted-foreground">
                      The latest widely-adopted accessibility standard
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <h3 className="font-bold text-accent mb-1">Section 508</h3>
                    <p className="text-sm text-muted-foreground">
                      Compliance with US federal accessibility requirements
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <h3 className="font-bold text-accent mb-1">EN 301 549</h3>
                    <p className="text-sm text-muted-foreground">
                      European standard for digital accessibility
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Known Limitations */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Known Limitations</h2>
              <p className="section-subtitle mx-auto">
                Areas where we are still working to improve accessibility
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {knownLimitations.map((item) => (
                <Card key={item.issue} variant="outlined" padding="md">
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">
                        {item.issue}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback Form */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="max-w-2xl mx-auto">
              <Card variant="elevated" padding="lg">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Accessibility Feedback
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We welcome your feedback on the accessibility of LibRay.
                  If you encounter any barriers or have suggestions for
                  improvement, please let us know using the form below.
                </p>
                <form className="space-y-6">
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
                      name="name"
                      className="w-full px-4 py-3 rounded-lg bg-card border border-card-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
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
                      name="email"
                      className="w-full px-4 py-3 rounded-lg bg-card border border-card-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                      placeholder="your@email.com"
                    />
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
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-card-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
                      placeholder="Describe the accessibility issue or suggestion..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    Submit Feedback
                  </button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container text-center max-w-2xl mx-auto">
            <h2 className="section-title mb-4">Need Additional Help?</h2>
            <p className="text-muted-foreground mb-8">
              If you need assistance using any feature of our platform or
              require information in an alternative format, our support team
              is here to help.
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
                href="/"
                className="btn-outline inline-flex items-center gap-2"
              >
                Back to Home
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
