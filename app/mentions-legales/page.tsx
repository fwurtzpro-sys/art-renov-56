import type { Metadata } from "next";
import { company, siteConfig } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site Art Renov 56.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        title="Mentions légales"
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Mentions légales", href: "/mentions-legales" },
        ]}
      />

      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <div className="prose-legal space-y-10 text-sm leading-relaxed text-ardoise-700 md:text-base">
            <div>
              <h2 className="font-display text-xl text-anthracite">Éditeur du site</h2>
              <p className="mt-3">
                Le présent site est édité par {company.legalName}.
              </p>
              <ul className="mt-3 space-y-1">
                <li>Adresse : {company.address}, {company.postalCode} {company.city}</li>
                <li>Téléphone : {company.phone}</li>
                <li>Email : {company.email}</li>
                <li>SIRET : {company.siret}</li>
                <li>RCS : {company.rcs}</li>
                <li>Assurance décennale : {company.insurance}</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl text-anthracite">Directeur de la publication</h2>
              <p className="mt-3">[Nom du directeur de la publication à compléter]</p>
            </div>

            <div>
              <h2 className="font-display text-xl text-anthracite">Hébergement</h2>
              <p className="mt-3">[Hébergeur à compléter]</p>
            </div>

            <div>
              <h2 className="font-display text-xl text-anthracite">Propriété intellectuelle</h2>
              <p className="mt-3">
                L&apos;ensemble des contenus présents sur {siteConfig.name}{" "}
                (textes, images, logos) est protégé par le droit de la
                propriété intellectuelle. Toute reproduction, même partielle,
                est soumise à autorisation préalable.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-anthracite">Limitation de responsabilité</h2>
              <p className="mt-3">
                {company.name} s&apos;efforce d&apos;assurer l&apos;exactitude
                des informations diffusées sur ce site, sans pouvoir en
                garantir l&apos;exhaustivité. {company.name} ne saurait être
                tenue responsable des erreurs ou omissions ni de
                l&apos;indisponibilité temporaire du site.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
