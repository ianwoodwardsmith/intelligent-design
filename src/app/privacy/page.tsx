import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title:       `Privacy Policy — ${site.name}`,
  description: `Privacy policy for ${site.name}.`,
  path:        "/privacy",
  noIndex:     true,
});

export default function PrivacyPage() {
  return (
    <Section className="py-24 sm:py-32 min-h-svh">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary mb-6">
            Privacy Policy
          </h1>
          <p className="text-text-secondary leading-relaxed">
            This privacy policy is a placeholder. Replace this content with your actual privacy
            policy before launching. Describe what data you collect, how you use it, and how
            users can request deletion or correction of their data.
          </p>
        </div>
      </Container>
    </Section>
  );
}
