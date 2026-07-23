import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Prise de contact",
    description:
      "Vous nous présentez votre projet par téléphone, email ou via notre formulaire de devis.",
  },
  {
    number: "02",
    title: "Visite et étude",
    description:
      "Nous nous déplaçons pour étudier votre chantier et affiner vos besoins avec vous.",
  },
  {
    number: "03",
    title: "Devis détaillé",
    description:
      "Vous recevez un devis gratuit, clair et détaillé, sans engagement de votre part.",
  },
  {
    number: "04",
    title: "Réalisation des travaux",
    description:
      "Notre équipe intervient selon le planning convenu, avec un suivi de chantier régulier.",
  },
  {
    number: "05",
    title: "Livraison",
    description:
      "Nous vous remettons un chantier propre et conforme, avec toutes les garanties associées.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Notre méthode"
          title="Un processus clair, du premier échange à la livraison"
          align="center"
        />

        <ol className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-5">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 0.08}>
              <span className="font-display text-4xl text-pierre-400">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-lg text-anthracite">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ardoise-600">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
