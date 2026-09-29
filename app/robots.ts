import type { MetadataRoute } from "next";
import { privatePrefixes } from "@/config/routes";
import { absoluteUrl, siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Préproduction : SITE_NOINDEX=true bloque toute exploration.
  if (siteConfig.noindex) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: [...privatePrefixes] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
