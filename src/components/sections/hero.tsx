import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";
import { hero } from "@/content/homepage";

// Full-viewport hero section. Text content uses disableAnimation=true to
// protect LCP score — the hero headline is always the LCP element.
export function Hero() {
  return (
    <section className="relative min-h-svh flex items-center bg-bg-primary overflow-hidden">
      {/* Dot pattern texture — decorative, aria-hidden */}
      <div
        className="absolute inset-0 bg-dot-pattern opacity-40"
        aria-hidden="true"
      />

      {/* Radial fade so dots don't compete with text */}
      <div
        className="absolute inset-0 bg-radial-gradient"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, var(--color-bg-primary) 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 py-24 sm:py-32">
        {/* Text content: disableAnimation protects LCP */}
        <FadeIn disableAnimation={true} className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-tight">
            {hero.headline}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            {hero.subheadline}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={hero.primaryCta.href} variant="primary" size="lg">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </FadeIn>

        {/* Below-fold decorative glow — can animate normally */}
        <FadeIn className="mt-20 flex justify-center" aria-hidden="true">
          <div className="w-64 h-1 rounded-full bg-accent opacity-20 blur-xl" />
        </FadeIn>
      </Container>
    </section>
  );
}
