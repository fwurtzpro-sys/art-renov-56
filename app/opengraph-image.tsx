import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/company";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #2b3843 0%, #57748a 100%)",
          color: "#f8f6f1",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, color: "#d8c6a3", textTransform: "uppercase" }}>
          Rénovation dans le Morbihan
        </div>
        <div style={{ fontSize: 72, marginTop: 24, display: "flex" }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 30, marginTop: 24, maxWidth: 900, color: "#c9d3db", display: "flex" }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
