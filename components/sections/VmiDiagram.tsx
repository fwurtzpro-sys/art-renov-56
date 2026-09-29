import { palette } from "@/config/theme";
/**
 * Schéma pédagogique simplifié du principe d'une VMI (ventilation mécanique
 * par insufflation). Illustratif : chaque installation dépend du logement.
 * Contenu technique à faire valider par ART RÉNOV 56.
 */
export const vmiSteps = [
  {
    title: "Air extérieur filtré",
    text: "L’air neuf est aspiré depuis l’extérieur ou les combles par un caisson de ventilation, puis filtré.",
  },
  {
    title: "Insufflation dans le logement",
    text: "L’air filtré est insufflé à faible vitesse dans le logement, généralement par une bouche placée dans une pièce centrale.",
  },
  {
    title: "Circulation dans les pièces",
    text: "Le logement est placé en très légère surpression : l’air se diffuse progressivement vers les différentes pièces.",
  },
  {
    title: "Évacuation de l’air vicié",
    text: "L’air intérieur, chargé d’humidité, est repoussé vers l’extérieur par les sorties d’air existantes du logement.",
  },
] as const;

function Badge({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="15" fill={palette.marine} stroke={palette.or} strokeWidth="1.5" />
      <text x={x} y={y + 5} textAnchor="middle" fill={palette.orClair} fontSize="15" fontFamily="Georgia, serif">
        {n}
      </text>
    </g>
  );
}

export function VmiDiagram() {
  const arrow = palette.or;
  return (
    <svg viewBox="0 0 640 440" role="img" aria-labelledby="vmi-titre vmi-desc" className="h-auto w-full">
      <title id="vmi-titre">Principe de fonctionnement d’une VMI</title>
      <desc id="vmi-desc">
        Coupe schématique d’une maison : un caisson placé dans les combles aspire et filtre l’air extérieur, l’insuffle dans le
        logement, l’air circule dans les pièces puis s’évacue par les sorties d’air existantes.
      </desc>
      <defs>
        <marker id="vmi-fleche" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={arrow} />
        </marker>
      </defs>

      {/* Maison */}
      <path d="M110 170 L320 40 L530 170" fill="none" stroke={palette.ivoire} strokeOpacity="0.8" strokeWidth="2" />
      <rect x="130" y="170" width="380" height="230" fill="none" stroke={palette.ivoire} strokeOpacity="0.8" strokeWidth="2" />
      <line x1="320" y1="170" x2="320" y2="400" stroke={palette.ivoire} strokeOpacity="0.25" strokeDasharray="4 6" />
      <line x1="40" y1="400" x2="600" y2="400" stroke={palette.ivoire} strokeOpacity="0.4" />
      <text x="225" y="385" textAnchor="middle" fill={palette.mutedOnDark} fontSize="12" letterSpacing="2">SÉJOUR</text>
      <text x="415" y="385" textAnchor="middle" fill={palette.mutedOnDark} fontSize="12" letterSpacing="2">CHAMBRE</text>
      <text x="320" y="84" textAnchor="middle" fill={palette.mutedOnDark} fontSize="11" letterSpacing="2">COMBLES</text>

      {/* Caisson VMI */}
      <rect x="282" y="110" width="76" height="40" fill={palette.marinePanel} stroke={palette.or} strokeWidth="1.5" />
      <text x="320" y="135" textAnchor="middle" fill={palette.orClair} fontSize="13" letterSpacing="2">VMI</text>

      {/* 1. Air extérieur */}
      <path d="M40 120 H 276" fill="none" stroke={arrow} strokeWidth="2" markerEnd="url(#vmi-fleche)" />
      <Badge x={70} y={96} n={1} />

      {/* 2. Insufflation */}
      <path d="M320 152 V 214" fill="none" stroke={arrow} strokeWidth="2" markerEnd="url(#vmi-fleche)" />
      <rect x="302" y="170" width="36" height="6" fill={palette.or} />
      <Badge x={352} y={196} n={2} />

      {/* 3. Circulation */}
      <path d="M300 250 C 250 250, 220 270, 190 300" fill="none" stroke={arrow} strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#vmi-fleche)" />
      <path d="M340 250 C 390 250, 420 270, 450 300" fill="none" stroke={arrow} strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#vmi-fleche)" />
      <Badge x={320} y={290} n={3} />

      {/* 4. Évacuation */}
      <path d="M140 300 H 72" fill="none" stroke={palette.mutedOnDark} strokeWidth="1.5" markerEnd="url(#vmi-fleche)" />
      <path d="M500 300 H 568" fill="none" stroke={palette.mutedOnDark} strokeWidth="1.5" markerEnd="url(#vmi-fleche)" />
      <rect x="127" y="290" width="6" height="20" fill={palette.mutedOnDark} />
      <rect x="507" y="290" width="6" height="20" fill={palette.mutedOnDark} />
      <Badge x={586} y={270} n={4} />
    </svg>
  );
}
