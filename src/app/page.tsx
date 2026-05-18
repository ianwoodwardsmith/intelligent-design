import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { FaqSchema } from "@/lib/structured-data";
import { faqs } from "@/content/homepage";

export default function Home() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Hero />
      <Features />
      <Faq />
      <Cta />
    </>
  );
}
