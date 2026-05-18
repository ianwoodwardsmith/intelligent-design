// ─── Homepage Content ─────────────────────────────────────────────────────────
//
// All copy for the homepage sections lives here.
// Components read from this file — swap content without touching JSX.
// ─────────────────────────────────────────────────────────────────────────────
import { BarChart2, Shield, Zap, Globe } from "lucide-react";

export const hero = {
  headline: "Your headline goes here",
  subheadline: "A supporting sentence that explains the value proposition in plain language.",
  primaryCta:   { label: "Get Started", href: "/contact" },
  secondaryCta: { label: "Learn More",  href: "/#features" },
};

export const features = [
  {
    icon: Zap,
    title: "Fast to set up",
    description: "Describe how quickly customers can get started. Be specific.",
  },
  {
    icon: BarChart2,
    title: "Powerful reporting",
    description: "What insights does your product surface? Describe the outcome.",
  },
  {
    icon: Shield,
    title: "Secure by default",
    description: "What security or compliance properties matter to your buyer?",
  },
  {
    icon: Globe,
    title: "Works everywhere",
    description: "Platform support, integration breadth, or geographic reach.",
  },
];

export const faqs = [
  {
    question: "How does billing work?",
    answer:   "Describe your pricing model clearly and simply.",
  },
  {
    question: "Is there a free trial?",
    answer:   "Answer this honestly — it's one of the most common questions.",
  },
  {
    question: "How do I get support?",
    answer:   "List your support channels and response time expectations.",
  },
  {
    question: "Can I cancel anytime?",
    answer:   "Describe your cancellation and refund policy.",
  },
];
