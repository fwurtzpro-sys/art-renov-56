import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/** Image Open Graph par défaut (partages réseaux sociaux), générée au build. */
export const alt = `${siteConfig.brand.name} — Rénovation intérieure & aménagement dans le Morbihan`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const serif = await readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-Medium.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0B0A",
          padding: 72,
          color: "#F5F0E6",
          border: "2px solid #B8955A",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, color: "#B8955A", fontSize: 22, letterSpacing: 6 }}>
          <div style={{ width: 56, height: 2, background: "#B8955A" }} />
          ELVEN • MORBIHAN
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontFamily: "Cormorant", fontSize: 112, lineHeight: 1 }}>
            ART RÉNOV<span style={{ color: "#B8955A", marginLeft: 28 }}>56</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 26, letterSpacing: 10, color: "#B8955A" }}>RÉNOVATION • AMÉNAGEMENT</div>
        </div>
        <div style={{ fontFamily: "Cormorant", fontSize: 40, color: "#D8D1C4" }}>
          Rénovation intérieure, salle de bain, cuisine, VMI, revêtements & finitions.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Cormorant", data: serif, weight: 500, style: "normal" }],
    },
  );
}
