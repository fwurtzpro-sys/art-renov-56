import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    short_name: siteConfig.brand.name,
    description: siteConfig.brand.shortDescription,
    start_url: "/",
    display: "browser",
    background_color: "#0B0B0A",
    theme_color: "#0B0B0A",
    lang: "fr",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
