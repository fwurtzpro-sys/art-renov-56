import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { palette } from "@/config/theme";

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
          background: palette.marine,
          fontFamily: "Cormorant",
          fontSize: 76,
          color: palette.ivoire,
        }}
      >
        A<span style={{ color: palette.or }}>56</span>
      </div>
    ),
    { ...size, fonts: [{ name: "Cormorant", data: serif, weight: 500, style: "normal" }] },
  );
}
