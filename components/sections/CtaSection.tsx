import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/data/company";

export function CtaSection() {
  return (
    <section className="bg-ardoise-900 py-24 text-creme md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight tracking-tightest sm:text-4xl md:text-5xl">
              Un projet de rénovation en tête ?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-base leading-relaxed text-ardoise-200 md:text-lg">
              Parlons-en. Contactez-nous pour un devis gratuit et sans
              engagement, ou appelez-nous directement au {company.phone}.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/devis" variant="ghost">
                Demander un devis
              </Button>
              <Button href="/contact" variant="ghost">
                Nous contacter
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
