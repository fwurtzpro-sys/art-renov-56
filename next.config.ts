import type { NextConfig } from "next";
import { legacyRedirects } from "./config/routes";

/**
 * Hébergement : Hostinger (offre à confirmer).
 * - Offre Node.js : conserver cette configuration (`next build` puis `next start`),
 *   ou activer `output: "standalone"` pour un déploiement allégé.
 * - Aucune dépendance à Vercel.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    return legacyRedirects.map(({ source, destination }) => ({ source, destination, statusCode: 301 as const }));
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
