import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  RotateCcw,
  Package,
  CheckCircle,
  Mail,
  ArrowRight,
  Clock,
  AlertCircle,
  RefreshCw,
  CreditCard,
  HelpCircle,
} from "lucide-react";

const returnSteps = [
  {
    step: 1,
    icon: Package,
    title: "Initiate Return",
    description:
      "Log into your account, go to Orders, and select the item you want to return. Click 'Request Return' to start the process.",
  },
  {
    step: 2,
    icon: Mail,
    title: "Get Your Label",
    description:
      "We'll email you a prepaid shipping label. Print it out and attach it securely to your package. No printer? Show the QR code at your local shipping center.",
  },
  {
    step: 3,
    icon: RotateCcw,
    title: "Ship It Back",
    description:
      "Drop off your package at the nearest shipping location. Keep your tracking number for reference. We'll notify you when we receive it.",
  },
  {
    step: 4,
    icon: CheckCircle,
    title: "Receive Refund",
    description:
      "Once we inspect and process your return (3-5 business days), your refund will be issued to your original payment method.",
  },
];

const conditions = [
  {
    allowed: true,
    text: "Items in original, unused condition with all packaging intact",
  },
  {
    allowed: true,
    text: "Returns initiated within 30 days of delivery date",
  },
  {
    allowed: true,
    text: "Books with manufacturing defects or damage during shipping",
  },
  {
    allowed: false,
    text: "E-books and digital content after access/download",
  },
  {
    allowed: false,
    text: "Items without original packaging or with missing accessories",
  },
  {
    allowed: false,
    text: "Items marked as 'Final Sale' or 'Non-Returnable'",
  },
  {
    allowed: false,
    text: "Returns initiated after 30 days of delivery",
  },
];

const refundTimeline = [
  {
    phase: "Return Received",
    timeline: "Day 0",
    description: "We receive your package at our warehouse",
  },
  {
    phase: "Inspection",
    timeline: "Days 1-2",
    description: "Our team inspects the item for condition and completeness",
  },
  {
    phase: "Processing",
    timeline: "Days 3-5",
    description: "Refund is processed and approved for your payment method",
  },
  {
    phase: "Refund Issued",
    timeline: "Days 5-10",
    description:
      "Refund appears on your statement (varies by bank/card issuer)",
  },
];

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Returns
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Returns & <span className="text-accent">Exchanges</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Not the right fit? No problem. We make returns easy with free
              prepaid labels and hassle-free refunds.
            </p>
          </div>
        </section>

        {/* Return Policy Overview */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <Card variant="elevated" padding="lg">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Our Return Policy
                  </h2>
                  <p className="text-accent font-medium text-lg mb-4">
                    30-day hassle-free returns on physical books
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    We want you to love every book you receive. If something
                    isn&apos;t right, you can return most physical items within
                    30 days of delivery for a full refund. Digital content
                    (e-books, audiobooks) can be refunded within 14 days if less
                    than 10% has been accessed.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-accent/5 border border-accent/10">
                    <div className="text-2xl font-bold text-accent mb-1">
                      30 Days
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Return window
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-accent/5 border border-accent/10">
                    <div className="text-2xl font-bold text-accent mb-1">
                      Free
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Return shipping
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-accent/5 border border-accent/10">
                    <div className="text-2xl font-bold text-accent mb-1">
                      5-10 Days
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Refund processing
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* How to Return */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">How to Return an Item</h2>
              <p className="section-subtitle mx-auto">
                Four simple steps to complete your return
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {returnSteps.map((step) => (
                <div key={step.step} className="text-center relative">
                  <div className="w-14 h-14 mx-auto rounded-full bg-accent/15 flex items-center justify-center mb-4">
                    <step.icon
                      className="w-7 h-7 text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-xs text-accent font-bold mb-1">
                    Step {step.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                  {step.step < returnSteps.length && (
                    <div className="hidden lg:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-accent/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Return Conditions */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Return Conditions</h2>
              <p className="section-subtitle mx-auto">
                What qualifies for a return
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Card variant="elevated" padding="lg">
                <div className="space-y-4">
                  {conditions.map((condition, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-card/50"
                    >
                      {condition.allowed ? (
                        <CheckCircle
                          className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <AlertCircle
                          className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <p
                        className={`text-sm leading-relaxed ${
                          condition.allowed
                            ? "text-muted-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {condition.text}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Refund Timeline */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Refund Timeline</h2>
              <p className="section-subtitle mx-auto">
                What happens after you ship your return
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {refundTimeline.map((item, index) => (
                  <Card
                    key={item.phase}
                    variant="elevated"
                    padding="lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Clock
                          className="w-6 h-6 text-accent"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-foreground">
                            {item.phase}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                            {item.timeline}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Exchange Process */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Exchange Process</h2>
              <p className="section-subtitle mx-auto">
                Prefer a different book instead of a refund?
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="elevated" padding="lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <RefreshCw
                        className="w-6 h-6 text-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">
                        How Exchanges Work
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        When requesting a return, select &quot;Exchange&quot;
                        instead of &quot;Refund&quot;. Choose the replacement
                        book you&apos;d like, and we&apos;ll ship it as soon as
                        we receive your return.
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        If the new item costs more, we&apos;ll charge the
                        difference. If it costs less, we&apos;ll refund the
                        difference.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card variant="elevated" padding="lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <CreditCard
                        className="w-6 h-6 text-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">
                        Price Differences
                      </h3>
                      <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">-</span>
                          <span>
                            <strong className="text-foreground">Higher price:</strong> We&apos;ll
                            charge the difference to your original payment method
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">-</span>
                          <span>
                            <strong className="text-foreground">Lower price:</strong> We&apos;ll
                            refund the difference within 5-10 business days
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">-</span>
                          <span>
                            <strong className="text-foreground">Same price:</strong> No
                            additional charges or refunds
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container text-center max-w-2xl mx-auto">
            <h2 className="section-title mb-4">Need Help with a Return?</h2>
            <p className="text-muted-foreground mb-8">
              Our support team is ready to assist you with any questions about
              returns or exchanges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/orders"
                className="btn-primary inline-flex items-center gap-2"
              >
                View My Orders
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="btn-outline inline-flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" aria-hidden="true" />
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
