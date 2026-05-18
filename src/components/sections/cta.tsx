import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/motion";

interface CtaProps {
  headline?: string;
  subtext?:  string;
  ctaLabel?: string;
  ctaHref?:  string;
}

// Full-width CTA section with a dark background. All props have sensible
// defaults so the component works out-of-the-box without configuration.
export function Cta({
  headline = "Ready to get started?",
  subtext  = "Join the teams already using this product to ship faster.",
  ctaLabel = "Get Started",
  ctaHref  = "/contact",
}: CtaProps) {
  return (
    <Section dark className="py-24 sm:py-32">
      <Container>
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            {headline}
          </h2>
          <p className="mt-4 text-text-secondary text-lg">{subtext}</p>
          <div className="mt-10">
            <Button href={ctaHref} variant="primary" size="lg">
              {ctaLabel}
            </Button>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
