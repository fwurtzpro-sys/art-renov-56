import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetadataOptions {
  /** Titre de la page ; le suffixe « | ART RÉNOV 56 » est ajouté par le layout. */
  title: string;
  /** Titre complet sans suffixe (page d'accueil). */
  absoluteTitle?: boolean;
  description: string;
  /** Chemin canonique, ex. "/cuisine". */
  path: string;
  /** Image Open Graph spécifique (sinon : app/opengraph-image). */
  image?: { url: string; width: number; height: number; alt: string };
  noindex?: boolean;
}

/**
 * Métadonnées d'une page : title, description, canonical, Open Graph, Twitter.
 * Les URL relatives sont résolues via `metadataBase` (layout racine).
 */
export function pageMetadata({
  title,
  absoluteTitle = false,
  description,
  path,
  image,
  noindex = false,
}: PageMetadataOptions): Metadata {
  const ogTitle = absoluteTitle ? title : `${title} | ${siteConfig.brand.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.brand.name,
      url: path,
      title: ogTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      ...(image ? { images: [image.url] } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
