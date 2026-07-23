import Link from "next/link";
import { faqItems } from "@/data/faq";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Reveal } from "@/components/ui/Reveal";

export function FaqSection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Tout ce qu'il faut savoir avant de démarrer"
            className="mb-0"
          />
          <div>
            <FaqAccordion items={faqItems.slice(0, 5)} />
            <Reveal delay={0.2}>
              <p className="mt-8 text-sm text-ardoise-600">
                D&apos;autres questions ?{" "}
                <Link
                  href="/faq"
                  className="font-medium text-ardoise-900 underline underline-offset-4"
                >
                  Consultez notre FAQ complète
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
