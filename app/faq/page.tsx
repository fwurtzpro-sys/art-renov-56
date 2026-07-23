import type { Metadata } from "next";
import { faqItems } from "@/data/faq";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaSection } from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Questions fréquentes",
  description:
    "Retrouvez les réponses aux questions les plus fréquentes sur nos prestations, nos devis et le déroulement de vos chantiers avec Art Renov 56.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "FAQ", url: "/faq" },
            ])
          ),
        }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions fréquentes"
        description="Retrouvez ici les réponses aux questions que l'on nous pose le plus souvent. Pour toute autre question, contactez-nous directement."
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "FAQ", href: "/faq" },
        ]}
      />

      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <FaqAccordion items={faqItems} />
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
