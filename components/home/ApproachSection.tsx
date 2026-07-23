"use client";

import { ShieldCheck, Clock, Users, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { staggerContainer, fadeUp } from "@/animations/variants";
import { motion } from "framer-motion";

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
    title: "Réalisation",
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

export function ApproachSection() {
  return (
    <section className="bg-pierre-50 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Notre approche"
          title="Une méthode claire, une confiance qui se construit chantier après chantier"
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-x-20">
          <div className="lg:border-r lg:border-ardoise-200/60 lg:pr-16">
            <Reveal>
              <h3 className="font-display text-xl text-anthracite md:text-2xl">
                Pourquoi nous choisir
              </h3>
            </Reveal>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2"
            >
              {reasons.map((reason) => (
                <motion.div key={reason.title} variants={fadeUp}>
                  <div className="flex size-12 items-center justify-center rounded-full bg-ardoise-100 transition-transform duration-500 ease-premium group-hover:scale-105">
                    <reason.icon
                      className="size-5 text-ardoise-800"
                      aria-hidden="true"
                    />
                  </div>
                  <h4 className="mt-5 font-display text-base text-anthracite">
                    {reason.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ardoise-600">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <Reveal>
              <h3 className="font-display text-xl text-anthracite md:text-2xl">
                Notre méthode
              </h3>
            </Reveal>
            <motion.ol
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="mt-10 space-y-8"
            >
              {steps.map((step) => (
                <motion.li
                  key={step.number}
                  variants={fadeUp}
                  className="flex gap-5"
                >
                  <span className="font-display text-2xl text-breton-400">
                    {step.number}
                  </span>
                  <div>
                    <h4 className="font-display text-base text-anthracite">
                      {step.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ardoise-600">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
