import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** Icône iOS provisoire (monogramme) — à remplacer par le logo définitif. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const serif = await readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-Medium.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B0A",
          fontFamily: "Cormorant",
          fontSize: 76,
          color: "#F5F0E6",
        }}
      >
        A<span style={{ color: "#B8955A" }}>56</span>
      </div>
    ),
    { ...size, fonts: [{ name: "Cormorant", data: serif, weight: 500, style: "normal" }] },
  );
}
