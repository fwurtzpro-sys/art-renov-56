import { ShieldCheck, Clock, Users, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Garantie décennale",
    description:
      "Chaque chantier est couvert par nos assurances professionnelles, pour votre entière sérénité.",
  },
  {
    icon: Users,
    title: "Interlocuteur unique",
    description:
      "Un seul contact suit votre projet du premier rendez-vous à la remise des clés.",
  },
  {
    icon: Clock,
    title: "Délais respectés",
    description:
      "Un planning de chantier précis, communiqué et tenu, sans mauvaise surprise.",
  },
  {
    icon: Award,
    title: "Finitions soignées",
    description:
      "Une exigence de finition digne des plus belles réalisations d'architecte.",
  },
];

export function WhyUs() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Pourquoi nous choisir"
          title="La confiance se construit chantier après chantier"
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.08}>
              <div className="text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-ardoise-100">
                  <reason.icon
                    className="size-6 text-ardoise-800"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-6 font-display text-lg text-anthracite">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ardoise-600">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
