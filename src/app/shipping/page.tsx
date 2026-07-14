import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  Truck,
  Globe,
  Package,
  Clock,
  MapPin,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Search,
  Mail,
} from "lucide-react";

const shippingMethods = [
  {
    name: "Standard Shipping",
    timeline: "5-7 business days",
    price: "Free over $50",
    regularPrice: "$4.99",
    description: "Reliable delivery for everyday orders",
    features: [
      "Free on orders over $50",
      "Tracking included",
      "Delivery Mon-Fri",
      "Signature not required",
    ],
  },
  {
    name: "Express Shipping",
    timeline: "2-3 business days",
    price: "$9.99",
    regularPrice: null,
    description: "Faster delivery when you need it sooner",
    features: [
      "Priority handling",
      "Full tracking",
      "Delivery Mon-Fri",
      "Signature may be required",
    ],
  },
  {
    name: "Overnight Shipping",
    timeline: "1 business day",
    price: "$19.99",
    regularPrice: null,
    description: "Next-day delivery for urgent orders",
    features: [
      "Next business day delivery",
      "Real-time tracking",
      "Signature required",
      "Order by 2PM EST",
    ],
  },
];

const internationalRegions = [
  {
    region: "Canada & Mexico",
    timeline: "7-10 business days",
    price: "From $12.99",
  },
  {
    region: "Europe",
    timeline: "10-14 business days",
    price: "From $18.99",
  },
  {
    region: "Asia & Pacific",
    timeline: "12-18 business days",
    price: "From $22.99",
  },
  {
    region: "Rest of World",
    timeline: "14-21 business days",
    price: "From $24.99",
  },
];

const trackingSteps = [
  {
    icon: Package,
    title: "Order Placed",
    description: "Your order has been confirmed and is being prepared.",
  },
  {
    icon: CheckCircle,
    title: "Processing",
    description: "We're picking and packing your books with care.",
  },
  {
    icon: Truck,
    title: "Shipped",
    description: "Your package is on its way! Tracking number sent via email.",
  },
  {
    icon: MapPin,
    title: "Out for Delivery",
    description: "Your package is with the delivery driver today.",
  },
];

const shippingFaqs = [
  {
    question: "How do I get free shipping?",
    answer:
      "Standard shipping is free on all domestic orders over $50. Simply add items totaling $50 or more to your cart and the free shipping option will be applied automatically at checkout.",
  },
  {
    question: "Can I change my shipping method after ordering?",
    answer:
      "You can upgrade your shipping method within 2 hours of placing your order. Visit your Orders page to make changes. Downgrades are not available once an order is processing.",
  },
  {
    question: "Do you ship to P.O. boxes?",
    answer:
      "Standard and Express shipping can be delivered to P.O. boxes. Overnight shipping requires a physical address for signature confirmation.",
  },
  {
    question: "What if my package is lost or damaged?",
    answer:
      "Contact our support team immediately. We'll file a claim with the carrier and either reship your order or issue a full refund. Please report issues within 7 days of the expected delivery date.",
  },
  {
    question: "Are there customs fees for international orders?",
    answer:
      "International orders may be subject to customs duties and taxes imposed by the destination country. These fees are the responsibility of the recipient and are not included in our shipping charges.",
  },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <Truck className="w-4 h-4" aria-hidden="true" />
              Shipping
            </div>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Shipping <span className="text-accent">Information</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Fast, reliable delivery to your doorstep. Free standard shipping
              on orders over $50.
            </p>
          </div>
        </section>

        {/* Shipping Methods */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Shipping Methods</h2>
              <p className="section-subtitle mx-auto">
                Choose the delivery speed that works for you
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {shippingMethods.map((method, index) => (
                <Card
                  key={method.name}
                  variant={index === 0 ? "elevated" : "outlined"}
                  padding="lg"
                  className={index === 0 ? "border-accent/30 relative" : ""}
                >
                  {index === 0 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-primary-dark text-xs font-bold">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="font-bold text-xl text-foreground mb-1">
                      {method.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {method.description}
                    </p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-3xl font-bold text-accent">
                        {method.price}
                      </span>
                      {method.regularPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {method.regularPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {method.timeline}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {method.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle
                          className="w-4 h-4 text-accent flex-shrink-0"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Order Tracking */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Order Tracking</h2>
              <p className="section-subtitle mx-auto">
                Follow your order from our warehouse to your door
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {trackingSteps.map((step, index) => (
                <div key={step.title} className="text-center relative">
                  <div className="w-14 h-14 mx-auto rounded-full bg-accent/15 flex items-center justify-center mb-4">
                    <step.icon
                      className="w-7 h-7 text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-xs text-accent font-bold mb-1">
                    Step {index + 1}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                  {index < trackingSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-accent/30" />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="text-muted-foreground text-sm mb-4">
                Have a tracking number?
              </p>
              <Link
                href="/orders"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                Track Your Order
              </Link>
            </div>
          </div>
        </section>

        {/* International Shipping */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">International Shipping</h2>
              <p className="section-subtitle mx-auto">
                We deliver to over 50 countries worldwide
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Card variant="elevated" padding="none">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-card-border">
                        <th className="text-left p-4 text-sm font-bold text-foreground">
                          Region
                        </th>
                        <th className="text-left p-4 text-sm font-bold text-foreground">
                          Delivery Time
                        </th>
                        <th className="text-right p-4 text-sm font-bold text-foreground">
                          Starting Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {internationalRegions.map((region) => (
                        <tr
                          key={region.region}
                          className="border-b border-card-border/50 last:border-b-0"
                        >
                          <td className="p-4 text-sm text-foreground font-medium">
                            {region.region}
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {region.timeline}
                          </td>
                          <td className="p-4 text-sm text-accent font-medium text-right">
                            {region.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              <p className="text-muted-foreground text-xs text-center mt-4">
                * International shipping rates vary by destination and package
                weight. Final costs calculated at checkout. Customs duties and
                taxes may apply.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping FAQs */}
        <section className="py-16 md:py-24 bg-primary-dark/30 border-y border-border/50">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">Shipping FAQs</h2>
              <p className="section-subtitle mx-auto">
                Common questions about shipping and delivery
              </p>
            </div>
            <div className="space-y-3 max-w-3xl mx-auto">
              {shippingFaqs.map((faq) => (
                <Card key={faq.question} variant="elevated" padding="lg">
                  <h3 className="font-bold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="section-container text-center max-w-2xl mx-auto">
            <h2 className="section-title mb-4">Ready to Order?</h2>
            <p className="text-muted-foreground mb-8">
              Browse our collection and enjoy free standard shipping on orders
              over $50.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/books"
                className="btn-primary inline-flex items-center gap-2"
              >
                Browse Books
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="btn-outline inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
