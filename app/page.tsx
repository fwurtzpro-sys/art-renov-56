import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Presentation } from "@/components/home/Presentation";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ApproachSection } from "@/components/home/ApproachSection";
import { ZoneSection } from "@/components/home/ZoneSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/company";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — Rénovation intérieure et extérieure dans le Morbihan`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Presentation />
      <ServicesSection />
      <ApproachSection />
      <ZoneSection />
      <CtaSection />
    </>
  );
}
