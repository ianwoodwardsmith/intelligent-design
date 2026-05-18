import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ContactForm } from "./contact-form";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title:       `Contact — ${site.name}`,
  description: "Get in touch with us. We'd love to hear from you.",
  path:        "/contact",
});

// Server component — exports metadata and renders the client ContactForm.
export default function ContactPage() {
  return (
    <Section className="py-24 sm:py-32 min-h-svh">
      <Container>
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary mb-2">
            Contact us
          </h1>
          <p className="text-text-secondary text-lg mb-10">
            We&apos;d love to hear from you. Fill out the form and we&apos;ll be in touch.
          </p>
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
