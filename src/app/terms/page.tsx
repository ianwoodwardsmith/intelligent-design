import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title:       `Terms of Service — ${site.name}`,
  description: `Terms of service for ${site.name}.`,
  path:        "/terms",
  noIndex:     true,
});

export default function TermsPage() {
  return (
    <Section className="py-24 sm:py-32 min-h-svh">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary mb-6">
            Terms of Service
          </h1>
          <p className="text-text-secondary leading-relaxed">
            These terms of service are a placeholder. Replace this content with your actual
            terms before launching. Describe the rules users agree to when using your product,
            limitations of liability, and any applicable governing law.
          </p>
        </div>
      </Container>
    </Section>
  );
}
