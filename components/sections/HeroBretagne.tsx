import type { CSSProperties } from "react";
import { Parallax } from "@/components/motion/Parallax";
import { bretagne } from "@/data/bretagne";

const timing = (delay: number, duration: number) =>
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
export function HeroBretagne() {
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
              <g className="geo-fade" style={timing(1.2, 3.2)}>
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
                className="geo-draw stroke-ivoire/45"
                strokeWidth={1.3}
                style={timing(0.5, 4.6)}
              />
              <path
                d={ouessant}
                className="geo-fade stroke-ivoire/45"
                strokeWidth={1.3}
                style={timing(2.4, 1.6)}
              />

              {/* Accents dorés : littoral du Morbihan, Belle-Île */}
              <path
                d={morbihan}
                pathLength={1}
                className="geo-draw stroke-or"
                strokeWidth={1.7}
                style={timing(3.9, 1.5)}
              />
              <path
                d={belleIle}
                className="geo-fade stroke-or"
                strokeWidth={1.4}
                style={timing(4.6, 1.2)}
              />

              {/* Elven : repère et filet vers la signature */}
              <path
                d={`M${elven.x} ${elven.y}L${leaderEnd.x} ${leaderEnd.y}H${leaderEnd.x + 26}`}
                pathLength={1}
                className="geo-draw stroke-or/70"
                strokeWidth={1}
                style={timing(5.1, 0.9)}
              />
              <g className="geo-fade" style={timing(5, 1.2)}>
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
            ...({ "--hero-delay": "5.4s" } as CSSProperties),
          }}
        >
          <p className="whitespace-nowrap font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-or">
            Ancré en Bretagne
          </p>
          <p className="mt-1.5 whitespace-nowrap font-serif text-[1.0625rem] italic text-ivoire/65">
            Morbihan • Elven
          </p>
        </div>
      </div>
    </div>
  );
}
