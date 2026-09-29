/**
 * Carte schématique du secteur (SVG, sans API ni cookie tiers).
 * Positions calculées à partir des coordonnées réelles des communes
 * (projection simple) — schéma indicatif, non contractuel.
 */
const BOUNDS = { west: -2.95, east: -2.4, north: 47.82, south: 47.52 };
const SIZE = { width: 600, height: 480 };

function project(lat: number, lon: number) {
  return {
    x: ((lon - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * SIZE.width,
    y: ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * SIZE.height,
  };
}

const places = [
  { name: "Elven", lat: 47.7325, lon: -2.5889, main: true, dx: 14, dy: -14 },
  { name: "Saint-Avé", lat: 47.6883, lon: -2.7358, dx: -14, dy: -12, anchor: "end" as const },
  { name: "Vannes", lat: 47.6582, lon: -2.7608, dx: -14, dy: 18, anchor: "end" as const },
  { name: "Theix-Noyalo", lat: 47.6244, lon: -2.6558, dx: 14, dy: 20 },
];

export function AreaMap() {
  const elven = project(47.7325, -2.5889);
  return (
    <figure className="relative">
      <svg
        viewBox={`0 0 ${SIZE.width} ${SIZE.height}`}
        role="img"
        aria-labelledby="carte-titre carte-desc"
        className="h-auto w-full bg-noir"
      >
        <title id="carte-titre">Schéma du secteur d’intervention d’ART RÉNOV 56</title>
        <desc id="carte-desc">
          Elven, siège de l’entreprise, et les communes voisines de Saint-Avé, Vannes et Theix-Noyalo, dans le Morbihan.
        </desc>
        <defs>
          <pattern id="carte-grille" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#B8955A" strokeOpacity="0.08" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={SIZE.width} height={SIZE.height} fill="url(#carte-grille)" />

        {/* Golfe du Morbihan — évocation stylisée */}
        <path
          d="M0 400 C 80 380, 120 330, 170 340 S 250 390, 300 372 S 380 352, 430 392 S 520 440, 600 420 L600 480 L0 480 Z"
          fill="#1C1B19"
        />
        <path d="M40 430 q 20 -8 40 0 t 40 0" fill="none" stroke="#B8955A" strokeOpacity="0.35" />
        <path d="M200 440 q 20 -8 40 0 t 40 0" fill="none" stroke="#B8955A" strokeOpacity="0.35" />
        <text x="110" y="462" fill="#A8A29A" fontSize="13" fontStyle="italic" fontFamily="Georgia, serif" letterSpacing="1">
          Golfe du Morbihan
        </text>

        {/* Cercles de proximité autour d'Elven */}
        {[70, 150, 230].map((radius) => (
          <circle key={radius} cx={elven.x} cy={elven.y} r={radius} fill="none" stroke="#B8955A" strokeOpacity="0.35" strokeDasharray="3 6" />
        ))}

        {/* Liaisons */}
        {places
          .filter((place) => !place.main)
          .map((place) => {
            const point = project(place.lat, place.lon);
            return (
              <line key={place.name} x1={elven.x} y1={elven.y} x2={point.x} y2={point.y} stroke="#B8955A" strokeOpacity="0.25" />
            );
          })}

        {places.map((place) => {
          const point = project(place.lat, place.lon);
          return (
            <g key={place.name}>
              {place.main ? <circle cx={point.x} cy={point.y} r="16" fill="#B8955A" fillOpacity="0.18" /> : null}
              <circle cx={point.x} cy={point.y} r={place.main ? 7 : 4.5} fill={place.main ? "#B8955A" : "#F5F0E6"} />
              <text
                x={point.x + place.dx}
                y={point.y + place.dy}
                textAnchor={place.anchor ?? "start"}
                fill={place.main ? "#CFB07A" : "#F5F0E6"}
                fontSize={place.main ? 20 : 15}
                fontFamily="Georgia, serif"
              >
                {place.name}
              </text>
            </g>
          );
        })}

        {/* Nord */}
        <g transform="translate(560 44)">
          <path d="M0 -18 L6 6 L0 2 L-6 6 Z" fill="#B8955A" />
          <text y="24" textAnchor="middle" fill="#A8A29A" fontSize="11" letterSpacing="2">
            N
          </text>
        </g>
      </svg>
      <figcaption className="mt-3 text-[0.8125rem] text-muted">Schéma indicatif — non à l’échelle.</figcaption>
    </figure>
  );
}
