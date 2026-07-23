import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Presentation } from "@/components/home/Presentation";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyUs } from "@/components/home/WhyUs";
import { RealisationsSection } from "@/components/home/RealisationsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ZoneSection } from "@/components/home/ZoneSection";
import { FaqSection } from "@/components/sections/FaqSection";
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
      <WhyUs />
      <RealisationsSection />
      <ProcessSection />
      <ZoneSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
