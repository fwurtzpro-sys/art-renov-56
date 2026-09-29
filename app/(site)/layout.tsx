import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/ui/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/schema";

/** Layout du site public (header, footer, données structurées de l'entreprise). */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={[businessSchema(), websiteSchema()]} />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
