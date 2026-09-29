import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/ui/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/schema";
import { ConsentManager } from "@/components/consent/ConsentManager";
import { consentCategories } from "@/config/consent";
import { href } from "@/config/routes";

/** Layout du site public (header, footer, données structurées de l'entreprise). */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={[businessSchema(), websiteSchema()]} />
      <SiteShell>{children}</SiteShell>
      {/* Monté uniquement si un service soumis à consentement est configuré */}
      {consentCategories.length > 0 ? <ConsentManager categories={consentCategories} cookiesHref={href("cookies")} /> : null}
    </>
  );
}
