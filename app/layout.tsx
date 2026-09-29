import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import "./globals.css";

/* Typographies auto-hébergées par next/font (aucune requête vers Google côté visiteur). */
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brand.name} — Rénovation intérieure dans le Morbihan`,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.shortDescription,
  applicationName: siteConfig.brand.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.brand.name,
  },
  robots: siteConfig.noindex ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0A",
  colorScheme: "light",
};

/**
 * Layout racine : document HTML, typographies, styles globaux.
 * Le site public vit dans app/(site) ; le futur espace client / admin
 * disposera de son propre groupe de routes et de son propre layout.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
