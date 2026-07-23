import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contactez Art Renov 56 pour toute question sur vos travaux de rénovation dans le Morbihan.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "Contact", url: "/contact" },
            ])
          ),
        }}
      />
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        description="Une question, un projet à discuter ? Notre équipe vous répond rapidement."
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <Reveal>
                <h2 className="font-display text-2xl text-anthracite md:text-3xl">
                  Nos coordonnées
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <ul className="mt-8 space-y-6">
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-5 shrink-0 text-pierre-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-anthracite">Téléphone</p>
                      <a href={`tel:${company.phone}`} className="text-sm text-ardoise-600">
                        {company.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-5 shrink-0 text-pierre-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-anthracite">Email</p>
                      <a href={`mailto:${company.email}`} className="text-sm text-ardoise-600">
                        {company.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-pierre-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-anthracite">Adresse</p>
                      <p className="text-sm text-ardoise-600">
                        {company.address}, {company.postalCode} {company.city}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-5 shrink-0 text-pierre-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-anthracite">Horaires</p>
                      <ul className="mt-1 space-y-1 text-sm text-ardoise-600">
                        {company.hours.map((slot) => (
                          <li key={slot.day}>
                            {slot.day} : {slot.hours}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
