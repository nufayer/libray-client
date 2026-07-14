import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Cookie, ArrowRight, Mail, Settings, BarChart3, Megaphone, Sliders } from "lucide-react";

const cookieTypes = [
  {
    icon: Settings,
    title: "Essential Cookies",
    description:
      "These cookies are strictly necessary for the platform to function. They enable core features such as maintaining your shopping cart, keeping you logged in, and processing secure transactions. Without these cookies, services you have requested cannot be provided.",
    examples: [
      "Session cookies for authentication",
      "Shopping cart persistence",
      "Security tokens and CSRF protection",
      "Load balancing and performance cookies",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics Cookies",
    description:
      "Analytics cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This data allows us to improve our platform, optimize content, and enhance the overall user experience.",
    examples: [
      "Page view and session tracking",
      "Feature usage and interaction patterns",
      "Error tracking and performance monitoring",
      "A/B testing and experiment data",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing Cookies",
    description:
      "Marketing cookies are used to track visitors across websites and display relevant advertisements. These cookies may be set by third-party advertising partners and build a profile of your interests based on your browsing activity across multiple sites.",
    examples: [
      "Retargeting and remarketing pixels",
      "Social media tracking and sharing buttons",
      "Cross-site advertising measurement",
      "Conversion tracking for ad campaigns",
    ],
  },
  {
    icon: Sliders,
    title: "Preference Cookies",
    description:
      "Preference cookies allow our platform to remember choices you make and provide enhanced, personalized features. They may be set by us or by third-party providers whose services we have added to our pages, such as language preferences and display settings.",
    examples: [
      "Language and currency preferences",
      "Display and layout settings",
      "Recently viewed items history",
      "Personalized recommendation seed data",
    ],
  },
];

const managementSteps = [
  {
    step: "1",
    title: "Browser Settings",
    description:
      "Most browsers allow you to control cookies through their settings. You can typically find these options in the \"Privacy\" or \"Security\" section of your browser's preferences. You can set your browser to block or delete cookies, or to notify you when a cookie is being set.",
  },
  {
    step: "2",
    title: "Cookie Consent Banner",
    description:
      "When you first visit LibRay, you'll see a cookie consent banner that lets you choose which categories of cookies to accept. You can change your preferences at any time by clicking the \"Cookie Settings\" link in the footer of any page.",
  },
  {
    step: "3",
    title: "Opt-Out Tools",
    description:
      "Several third-party analytics and advertising providers offer opt-out mechanisms. You can visit the Network Advertising Initiative opt-out page or the Digital Advertising Alliance's opt-out tool to manage your preferences across participating services.",
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <Cookie className="w-4 h-4" aria-hidden="true" />
              Legal
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Cookie <span className="text-accent">Policy</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Learn about how we use cookies and similar technologies to
              enhance your experience on LibRay.
            </p>
          </div>
        </section>

        {/* What Are Cookies */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <Card variant="elevated" padding="lg">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  What Are Cookies?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Cookies are small text files that are placed on your computer
                  or mobile device when you visit a website. They are widely
                  used to make websites work more efficiently and to provide
                  information to website owners about how their sites are being
                  used.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies can be &quot;persistent&quot; (remaining on your device until
                  deleted) or &quot;session-based&quot; (deleted when you close your
                  browser). They help us recognize your device, remember your
                  preferences, and improve your browsing experience on our
                  platform.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Cookie Types */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Types of Cookies We Use</h2>
              <p className="section-subtitle mx-auto">
                We use different categories of cookies for different purposes
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {cookieTypes.map((type) => (
                <Card key={type.title} variant="elevated" padding="lg">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <type.icon
                        className="w-6 h-6 text-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">
                        {type.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {type.description}
                  </p>
                  <ul className="space-y-2">
                    {type.examples.map((example) => (
                      <li
                        key={example}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-accent mt-1" aria-hidden="true">
                          •
                        </span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Manage */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">How to Manage Cookies</h2>
              <p className="section-subtitle mx-auto">
                You have several options for controlling and managing cookies
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {managementSteps.map((step) => (
                <Card key={step.step} variant="elevated" padding="lg" className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/15 flex items-center justify-center">
                    <span className="text-accent font-bold text-lg">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Third-Party Cookies */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Third-Party Cookies
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Some cookies on our platform are set by third-party services
                  that appear on our pages, including payment processors,
                  analytics providers, and advertising partners. We do not
                  control the use of these cookies and recommend that you
                  review the privacy policies of these third parties directly.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our analytics are powered by industry-standard tools that
                  help us understand aggregate usage patterns. Advertising
                  partners may use cookies to deliver relevant ads based on
                  your interests and browsing history across participating
                  websites.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You can opt out of third-party advertising cookies by
                  visiting the Network Advertising Initiative opt-out page or
                  the Digital Advertising Alliance&apos;s opt-out tool. Note that
                  opting out does not mean you will not see advertisements, but
                  rather that they will not be personalized based on your
                  browsing activity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 md:py-24">
          <div className="section-container text-center max-w-2xl mx-auto">
            <h2 className="section-title mb-4">Questions About Cookies?</h2>
            <p className="text-muted-foreground mb-8">
              If you have any questions about our use of cookies or need help
              managing your preferences, please reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Contact Us
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
