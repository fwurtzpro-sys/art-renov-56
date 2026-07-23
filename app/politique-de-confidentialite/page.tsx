import type { Metadata } from "next";
import { company, siteConfig } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données du site Art Renov 56.",
  path: "/politique-de-confidentialite",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Politique de confidentialité"
        crumbs={[
          { label: "Accueil", href: "/" },
          {
            label: "Politique de confidentialité",
            href: "/politique-de-confidentialite",
          },
        ]}
      />

      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <div className="space-y-10 text-sm leading-relaxed text-ardoise-700 md:text-base">
            <div>
              <h2 className="font-display text-xl text-anthracite">Données collectées</h2>
              <p className="mt-3">
                Lorsque vous utilisez nos formulaires de contact ou de demande
                de devis, nous collectons les données que vous nous
                transmettez volontairement : nom, email, téléphone, ville et
                description de votre projet.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-anthracite">Finalité du traitement</h2>
              <p className="mt-3">
                Ces données sont utilisées exclusivement pour répondre à vos
                demandes de contact ou de devis, et ne sont ni cédées ni
                vendues à des tiers.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-anthracite">Durée de conservation</h2>
              <p className="mt-3">
                Vos données sont conservées pendant la durée nécessaire au
                traitement de votre demande, puis archivées ou supprimées
                conformément à la réglementation en vigueur.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-anthracite">Vos droits</h2>
              <p className="mt-3">
                Conformément au Règlement Général sur la Protection des
                Données (RGPD), vous disposez d&apos;un droit d&apos;accès,
                de rectification et de suppression de vos données. Pour
                exercer ce droit, contactez-nous à l&apos;adresse{" "}
                {company.email}.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-anthracite">Cookies</h2>
              <p className="mt-3">
                {siteConfig.name} n&apos;utilise pas de cookies de suivi
                publicitaire. Seuls des cookies techniques strictement
                nécessaires au fonctionnement du site peuvent être déposés.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
