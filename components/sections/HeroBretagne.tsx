import type { CSSProperties } from "react";
import { Parallax } from "@/components/motion/Parallax";
import { bretagne } from "@/data/bretagne";

/** Rythmes du tracé (délai, durée en secondes). « fast » se termine avec le héros (≈ 3,3 s), « slow » en ≈ 5,4 s. */
const paces = {
  fast: {
    contours: [0.5, 2],
    coast: [0.3, 2.4],
    ouessant: [1.2, 1],
    morbihan: [1.8, 1.1],
    belleIle: [2.3, 0.6],
    leader: [2.5, 0.6],
    dot: [2.4, 0.7],
    label: 2.5,
  },
  slow: {
    contours: [1.2, 3.2],
    coast: [0.5, 4.6],
    ouessant: [2.4, 1.6],
    morbihan: [3.9, 1.5],
    belleIle: [4.6, 1.2],
    leader: [5.1, 0.9],
    dot: [5, 1.2],
    label: 5.4,
  },
} as const;

const timing = ([delay, duration]: readonly [number, number] | readonly number[]) =>
  ({
    "--geo-delay": `${delay}s`,
    "--geo-duration": `${duration}s`,
  }) as CSSProperties;

/**
 * Signature visuelle de la partie droite du héros : silhouette fine de la Bretagne
 * (filigrane ton sur ton), littoral morbihannais et Elven en doré, courbes de niveau marines.
 * Purement décoratif : masqué aux lecteurs d'écran, sans interaction, absent sous 1280 px.
 * Le tracé se dessine au chargement par animation CSS finie (jamais de contenu masqué).
 */
export function HeroBretagne({ pace = "fast" }: { pace?: keyof typeof paces }) {
  const t = paces[pace];
  const { viewBox, coast, morbihan, belleIle, ouessant, contours, elven } =
    bretagne;
  const leaderEnd = { x: elven.x + 44, y: elven.y + 46 };

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[56%] select-none xl:block"
    >
      <div className="absolute right-[-6%] top-1/2 w-[min(52vw,860px)] -translate-y-[47%]">
        {/* Le tracé se dissout vers l'est (limite de région non dessinée) */}
        <div
          style={{
            maskImage:
              "linear-gradient(90deg, #000 0%, #000 64%, transparent 92%)",
            WebkitMaskImage:
              "linear-gradient(90deg, #000 0%, #000 64%, transparent 92%)",
          }}
        >
          <Parallax range={[-12, 12]}>
            <svg
              viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
              className="block h-auto w-full overflow-visible"
              fill="none"
            >
              {/* Courbes de niveau marines */}
              <g className="geo-fade" style={timing(t.contours)}>
                {contours.map((path, index) => (
                  <path
                    key={index}
                    d={path}
                    className="stroke-ivoire"
                    strokeOpacity={0.11 - index * 0.03}
                    strokeWidth={1}
                  />
                ))}
              </g>

              {/* Littoral */}
              <path
                d={coast}
                pathLength={1}
                className="geo-draw stroke-ivoire/55"
                strokeWidth={1.3}
                style={timing(t.coast)}
              />
              <path
                d={ouessant}
                className="geo-fade stroke-ivoire/55"
                strokeWidth={1.3}
                style={timing(t.ouessant)}
              />

              {/* Accents dorés : littoral du Morbihan, Belle-Île */}
              <path
                d={morbihan}
                pathLength={1}
                className="geo-draw stroke-or"
                strokeWidth={1.7}
                style={timing(t.morbihan)}
              />
              <path
                d={belleIle}
                className="geo-fade stroke-or"
                strokeWidth={1.4}
                style={timing(t.belleIle)}
              />

              {/* Elven : repère et filet vers la signature */}
              <path
                d={`M${elven.x} ${elven.y}L${leaderEnd.x} ${leaderEnd.y}H${leaderEnd.x + 26}`}
                pathLength={1}
                className="geo-draw stroke-or/70"
                strokeWidth={1}
                style={timing(t.leader)}
              />
              <g className="geo-fade" style={timing(t.dot)}>
                <circle
                  cx={elven.x}
                  cy={elven.y}
                  r={11}
                  className="stroke-or/50"
                  strokeWidth={1}
                />
                <circle cx={elven.x} cy={elven.y} r={3.6} className="fill-or" />
              </g>
            </svg>
          </Parallax>
        </div>

        {/* Petite signature typographique */}
        <div
          className="hero-in absolute"
          style={{
            left: `${((leaderEnd.x + 34) / viewBox.width) * 100}%`,
            top: `${((leaderEnd.y - 9) / viewBox.height) * 100}%`,
            ...({ "--hero-delay": `${t.label}s` } as CSSProperties),
          }}
        >
          <p className="whitespace-nowrap font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-or">
            Ancré en Bretagne
          </p>
          <p className="mt-1.5 whitespace-nowrap font-serif text-[1.0625rem] italic text-ivoire/85">
            Morbihan • Elven
          </p>
        </div>
      </div>
    </div>
  );
}
