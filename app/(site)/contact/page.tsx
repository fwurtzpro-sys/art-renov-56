import type { Metadata } from "next";
import { HeroItem } from "@/components/motion/Hero";
import { heroDelay } from "@/lib/motion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PendingValue } from "@/components/ui/PendingValue";
import { Accent } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { href } from "@/config/routes";
import { getEmail, getPhone, getPublicLocality, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact & devis gratuit – Rénovation intérieure",
  description:
    "Parlez-nous de votre projet de rénovation ou d’aménagement intérieur à Elven et dans le Morbihan : demandez votre devis gratuit et sans engagement à ART RÉNOV 56.",
  path: href("contact"),
});

const reassurance = [
  "Devis gratuit et sans engagement",
  "Un interlocuteur unique pour votre projet",
  "Vos informations servent uniquement à traiter votre demande",
];

function ContactLine({ icon, label, children }: { icon: IconName; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-5 border-t border-line py-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-or/50">
        <Icon name={icon} className="h-5 w-5 text-or" />
      </span>
      <div>
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted">{label}</p>
        <div className="mt-1.5 text-[1.0625rem]">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  const phone = getPhone();
  const email = getEmail();
  const { openingHours, serviceArea } = siteConfig;

  return (
    <div className="tone-dark bg-marine text-ivoire">
      <Container className="pb-section pt-10">
        <Breadcrumb route="contact" />

        <div className="mt-14 grid gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Gauche : titre, coordonnées, réassurance */}
          <div className="lg:col-span-5">
            <HeroItem as="p" delay={heroDelay.eyebrow} className="eyebrow">
              Contact
            </HeroItem>
            <HeroItem as="h1" id="page-titre" delay={heroDelay.title[0]} className="mt-6 font-serif text-display-xl font-medium lg:text-display-page">
              Parlons de
              <br />
              <Accent>votre projet.</Accent>
            </HeroItem>
            <HeroItem as="p" delay={heroDelay.text} className="mt-7 max-w-md text-lead text-ivoire/80">
              Décrivez-nous votre projet en quelques lignes. Nous revenons vers vous pour en discuter et vous proposer un devis
              gratuit et sans engagement.
            </HeroItem>

            <ul className="mt-12">
              <ContactLine icon="phone" label="Téléphone">
                {phone ? (
                  <a href={phone.href} className="transition-colors hover:text-or">
                    {phone.display}
                  </a>
                ) : (
                  <PendingValue />
                )}
              </ContactLine>
              <ContactLine icon="mail" label="Email">
                {email ? (
                  <a href={email.href} className="break-all transition-colors hover:text-or">
                    {email.display}
                  </a>
                ) : (
                  <PendingValue />
                )}
              </ContactLine>
              <ContactLine icon="mapPin" label="Localisation">
                {getPublicLocality()}
                <span className="block text-[0.9375rem] text-muted">{serviceArea.label}</span>
              </ContactLine>
              {openingHours.length > 0 ? (
                <ContactLine icon="clock" label="Horaires">
                  <ul className="space-y-1">
                    {openingHours.map((slot) => (
                      <li key={slot.days}>
                        {slot.days} : {slot.hours}
                      </li>
                    ))}
                  </ul>
                </ContactLine>
              ) : null}
              <li className="border-t border-line" aria-hidden />
            </ul>

            <ul className="mt-10 space-y-4">
              {reassurance.map((item) => (
                <li key={item} className="flex items-center gap-4 text-[0.9375rem] text-ivoire/85">
                  <Icon name="check" className="h-5 w-5 shrink-0 text-or" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Droite : formulaire */}
          <div className="lg:col-span-7">
            <section aria-labelledby="formulaire-titre" className="border border-line bg-marine-panel p-6 sm:p-10 lg:p-12">
              <h2 id="formulaire-titre" className="font-serif text-display-sm font-medium">
                Votre demande de devis
              </h2>
              <div className="mt-6">
                <ContactForm privacyHref={href("privacy")} />
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
