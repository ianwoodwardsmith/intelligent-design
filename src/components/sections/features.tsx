import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";
import { features } from "@/content/homepage";

// 2×2 responsive grid of feature cards. Each card is below the fold
// so FadeIn animations run normally (no disableAnimation needed).
export function Features() {
  return (
    <Section id="features" dark className="py-24 sm:py-32">
      <Container>
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Everything you need
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
            Built for speed, reliability, and teams that care about the details.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.title}>
                <div className="glass-card rounded-xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent shrink-0">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-semibold text-text-primary">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
