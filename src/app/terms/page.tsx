import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { FileText, ArrowRight, Mail } from "lucide-react";

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing or using the LibRay website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use our platform. We reserve the right to modify these terms at any time, and your continued use of the platform constitutes acceptance of any changes.",
      "You must be at least 18 years old to create an account or make purchases on LibRay. By using our services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into binding agreements.",
    ],
  },
  {
    title: "Use of Our Service",
    content: [
      "LibRay provides an online platform for browsing, purchasing, and reviewing books. Our services include personalized recommendations, wish lists, reading history tracking, and community features such as reviews and reading lists.",
      "You agree to use our platform only for lawful purposes and in accordance with these Terms. You may not use our services in any way that could damage, disable, overburden, or impair our infrastructure, or interfere with any other party's use of the platform.",
      "We reserve the right to terminate or restrict your access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.",
    ],
  },
  {
    title: "User Accounts",
    content: [
      "To access certain features, you must create an account by providing accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      "You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We are not liable for any loss or damage arising from unauthorized use of your credentials.",
      "You may not share your account with others or create multiple accounts. Each account must be registered by a single individual, and you must be at least 18 years of age to register.",
    ],
  },
  {
    title: "Orders and Payments",
    content: [
      "All orders are subject to product availability. We reserve the right to cancel or limit quantities at our discretion. If we are unable to fulfill your order, we will notify you and provide a full refund.",
      "Prices are displayed in your local currency and include applicable taxes unless stated otherwise. We reserve the right to change prices at any time, but price changes will not affect orders already confirmed.",
      "Payment must be received in full before your order is processed. We accept major credit cards, debit cards, and other payment methods as displayed at checkout. All payment information is securely processed by our payment partners.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All content on the LibRay platform, including text, graphics, logos, icons, images, audio clips, and software, is the property of LibRay or its licensors and is protected by copyright, trademark, and other intellectual property laws.",
      "You are granted a limited, non-exclusive, non-transferable license to access and use the platform for personal, non-commercial purposes. You may not copy, modify, distribute, sell, or lease any part of our services or included software.",
      "User-generated content, including reviews and reading lists, remains your property, but by posting such content on LibRay, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display that content.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, LibRay and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services.",
      "Our total liability to you for all claims arising from or related to your use of the platform shall not exceed the amount you paid to LibRay in the twelve months preceding the claim.",
      "These limitations apply regardless of the legal theory, whether based on warranty, contract, tort, or any other legal theory, and whether or not LibRay has been advised of the possibility of such damages.",
    ],
  },
  {
    title: "Governing Law",
    content: [
      "These Terms of Service are governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.",
      "Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of the London Court of International Arbitration, unless you opt out of arbitration within 30 days of accepting these Terms.",
      "If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      "If you have any questions about these Terms of Service, please contact us at legal@libray.com or write to LibRay Legal Department, 123 Book Lane, Reading, RG1 1AA, United Kingdom.",
      "We will respond to your inquiry within 10 business days and will do our best to address any concerns promptly and fairly.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <FileText className="w-4 h-4" aria-hidden="true" />
              Legal
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Terms of <span className="text-accent">Service</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Please read these terms carefully before using our platform.
              They govern your use of LibRay&apos;s services.
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
            <h2 className="section-title mb-4">Need Clarification?</h2>
            <p className="text-muted-foreground mb-8">
              If you have questions about these terms or need legal
              clarification, our team is ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Contact Legal
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
