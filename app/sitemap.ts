import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/company";
import { services } from "@/data/services";
import { realisations } from "@/data/realisations";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/a-propos",
    "/prestations",
    "/realisations",
    "/zone-intervention",
    "/faq",
    "/contact",
    "/devis",
    "/mentions-legales",
    "/politique-de-confidentialite",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteConfig.url}/prestations/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const realisationRoutes = realisations.map((realisation) => ({
    url: `${siteConfig.url}/realisations/${realisation.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...realisationRoutes];
}
