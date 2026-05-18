"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";
import { faqs } from "@/content/homepage";

// Accordion FAQ. Stores the open item index in state. Only one item
// open at a time — clicking an open item closes it.
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <Section id="faq" className="py-24 sm:py-32">
      <Container>
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
            Have a different question? Reach out and we&apos;ll help.
          </p>
        </FadeIn>

        <FadeIn className="max-w-2xl mx-auto divide-y divide-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-text-primary font-medium hover:text-accent transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </button>

                {/* Height animation via max-height transition */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="pb-5 text-text-secondary text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </FadeIn>
      </Container>
    </Section>
  );
}
