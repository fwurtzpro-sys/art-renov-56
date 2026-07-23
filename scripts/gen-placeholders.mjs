import { writeFileSync } from "node:fs";

// Generates abstract, premium-feeling placeholder visuals (architecture-inspired
// bands + grain) in the brand palette, standing in for real project photography
// until Art Renov 56 supplies actual site photos.

const palette = {
  ardoise900: "#2b3843",
  ardoise700: "#394d5d",
  ardoise500: "#57748a",
  pierre300: "#d8c6a3",
  pierre500: "#b89661",
  creme: "#f8f6f1",
};

function placeholder({ width, height, seed, tone = "dark" }) {
  const bg = tone === "dark" ? palette.ardoise900 : palette.pierre300;
  const bandColor = tone === "dark" ? palette.ardoise700 : palette.pierre500;
  const accent = tone === "dark" ? palette.pierre500 : palette.ardoise700;

  const bands = Array.from({ length: 6 })
    .map((_, i) => {
      const x = (seed * 37 + i * 91) % width;
      const w = 40 + ((seed + i * 53) % 120);
      return `<rect x="${x}" y="0" width="${w}" height="${height}" fill="${bandColor}" opacity="0.08" />`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g${seed}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}" />
      <stop offset="100%" stop-color="${tone === "dark" ? palette.ardoise500 : palette.pierre500}" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g${seed})" />
  ${bands}
  <circle cx="${width * 0.82}" cy="${height * 0.22}" r="${Math.min(width, height) * 0.18}" fill="${accent}" opacity="0.15" />
  <rect x="0" y="${height * 0.78}" width="${width}" height="2" fill="${palette.creme}" opacity="0.25" />
</svg>`;
}

const targets = [
  { file: "public/images/hero/hero-main.svg", w: 1600, h: 2000, seed: 3, tone: "dark" },
  { file: "public/images/about/atelier.svg", w: 1200, h: 1400, seed: 11, tone: "light" },
  { file: "public/images/services/renovation-interieure.svg", w: 1200, h: 900, seed: 21, tone: "dark" },
  { file: "public/images/services/renovation-exterieure.svg", w: 1200, h: 900, seed: 22, tone: "light" },
  { file: "public/images/services/peinture.svg", w: 1200, h: 900, seed: 23, tone: "dark" },
  { file: "public/images/services/revetements-sols.svg", w: 1200, h: 900, seed: 24, tone: "light" },
  { file: "public/images/services/revetements-muraux.svg", w: 1200, h: 900, seed: 25, tone: "dark" },
  { file: "public/images/services/amenagement-interieur.svg", w: 1200, h: 900, seed: 26, tone: "light" },
  { file: "public/images/realisations/maison-vannes.svg", w: 1400, h: 1000, seed: 31, tone: "dark" },
  { file: "public/images/realisations/maison-vannes-2.svg", w: 1400, h: 1000, seed: 32, tone: "light" },
  { file: "public/images/realisations/facade-lorient.svg", w: 1400, h: 1000, seed: 33, tone: "dark" },
  { file: "public/images/realisations/appartement-auray.svg", w: 1400, h: 1000, seed: 34, tone: "light" },
  { file: "public/images/realisations/salle-de-bain-pontivy.svg", w: 1400, h: 1000, seed: 35, tone: "dark" },
];

for (const t of targets) {
  writeFileSync(t.file, placeholder({ width: t.w, height: t.h, seed: t.seed, tone: t.tone }));
  console.log("wrote", t.file);
}
