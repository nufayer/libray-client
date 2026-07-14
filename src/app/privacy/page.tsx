import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Shield, ArrowRight, Mail } from "lucide-react";

const sections = [
  {
    title: "Information We Collect",
    content: [
      "When you create an account with LibRay, we collect personal information such as your name, email address, and shipping address. This information is necessary to process your orders, deliver your books, and communicate with you about your purchases and account activity.",
      "We also collect payment information when you make a purchase. This includes credit card details and billing addresses, which are securely processed through our trusted payment partners and never stored directly on our servers.",
      "Additionally, we gather usage data automatically, including your browsing history on our site, search queries, pages viewed, and interaction patterns. This data helps us improve our recommendations and optimize your experience across the platform.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "Your personal information is used primarily to fulfill orders, manage your account, and provide customer support. We use your email address to send order confirmations, shipping updates, and responses to your inquiries.",
      "We use aggregated and anonymized usage data to analyze trends, improve our website functionality, and develop new features. This data may also be used to personalize your experience, including tailored book recommendations based on your reading history.",
      "With your consent, we may send you marketing communications about new releases, promotions, and events. You can opt out of these communications at any time through your account settings or by using the unsubscribe link in any marketing email.",
    ],
  },
  {
    title: "Sharing Your Information",
    content: [
      "We do not sell your personal information to third parties. We share your information only with service providers who assist us in operating our platform, such as payment processors, shipping carriers, and cloud hosting providers.",
      "These third-party partners are contractually obligated to use your information only for the purposes we specify and to maintain appropriate security measures to protect it.",
      "We may also disclose your information when required by law, to protect our rights, or in connection with a merger, acquisition, or sale of assets, with appropriate notice provided to affected users.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement industry-standard security measures to protect your personal information, including encryption in transit and at rest, secure server infrastructure, and regular security audits.",
      "Access to personal data is restricted to authorized personnel who need it to perform their job functions, and all employees with access are bound by strict confidentiality obligations.",
      "While we take every reasonable precaution, no method of transmission or storage is completely secure. We encourage you to use strong, unique passwords for your account and to contact us immediately if you suspect any unauthorized access.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "You have the right to access, correct, or delete your personal information at any time through your account settings. You may also request a copy of all data we hold about you.",
      "If you are in the European Economic Area, you have additional rights under the General Data Protection Regulation, including the right to data portability and the right to restrict processing.",
      "To exercise any of these rights, please contact us at privacy@libray.com. We will respond to your request within 30 days and may need to verify your identity before processing certain requests.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small text files stored on your device that help us recognize returning visitors and remember your preferences.",
      "Essential cookies are required for basic site functionality, such as maintaining your shopping cart and keeping you logged in. Analytics cookies help us understand how visitors interact with our site, and preference cookies allow us to remember your settings.",
      "You can manage your cookie preferences through your browser settings. However, disabling certain cookies may limit your ability to use some features of our platform. For more details, please refer to our Cookie Policy.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will notify you via email or a prominent notice on our website.",
      "We encourage you to review this policy periodically. Your continued use of our platform after any modifications indicates your acceptance of the updated terms.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at privacy@libray.com or write to us at LibRay Privacy Team, 123 Book Lane, Reading, RG1 1AA, United Kingdom.",
      "We are committed to resolving any privacy concerns promptly and transparently. If you are not satisfied with our response, you may have the right to lodge a complaint with your local data protection authority.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <Shield className="w-4 h-4" aria-hidden="true" />
              Legal
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Privacy <span className="text-accent">Policy</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Your privacy matters to us. Learn how we collect, use, and
              protect your personal information.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: January 15, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="max-w-3xl mx-auto space-y-12">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container text-center max-w-2xl mx-auto">
            <h2 className="section-title mb-4">Have Questions?</h2>
            <p className="text-muted-foreground mb-8">
              If you have any questions about our privacy practices or need to
              exercise your data rights, we&apos;re here to help.
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
