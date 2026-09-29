import type { ReactNode, SVGProps } from "react";

/**
 * Jeu d'icônes linéaires maison (trait 1.5, grille 24×24), sans dépendance.
 * Décoratives par défaut (aria-hidden) ; passer `title` si l'icône porte seule un sens.
 */
const icons = {
  phone: <path d="M5.2 3.8h3.3l1.6 4.4-2.2 1.4a11.5 11.5 0 0 0 6.5 6.5l1.4-2.2 4.4 1.6v3.3a1.5 1.5 0 0 1-1.6 1.5C10.3 19.7 4.3 13.7 3.7 5.4a1.5 1.5 0 0 1 1.5-1.6Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3.6 6 8.4 6.8L20.4 6" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-6.8-6-6.8-11.3a6.8 6.8 0 0 1 13.6 0C18.8 15 12 21 12 21Z" />
      <circle cx="12" cy="9.6" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  arrowRight: <path d="M4 12h15.5M13.5 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  menu: <path d="M3.5 7h17M3.5 12h17M9.5 17h11" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  home: <path d="M3.5 11 12 4l8.5 7M5.5 9.4V20h13V9.4M10 20v-5.5h4V20" />,
  bath: <path d="M3 12h18v1.5A5.5 5.5 0 0 1 15.5 19h-7A5.5 5.5 0 0 1 3 13.5V12ZM5.5 12V6.2a2.2 2.2 0 0 1 4-1.2M7.5 19l-1 2M16.5 19l1 2" />,
  wind: <path d="M3 8.5h10.5a2.75 2.75 0 1 0-2.75-2.75M3 12.5h15a2.75 2.75 0 1 1-2.75 2.75M3 16.5h7" />,
  kitchen: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="0.5" />
      <path d="M4 9.5h16M12 9.5v11M8 6.5h1.5M14.5 6.5H16M9.5 13v3M14.5 13v3" />
    </>
  ),
  layers: <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" />,
  conversation: <path d="M3.5 4.5h12v9H8.5l-3.5 3v-3H3.5v-9ZM15.5 8.5h5v8H19v3l-3.5-3h-4.5v-3" />,
  ruler: <path d="M3 16.5 16.5 3 21 7.5 7.5 21 3 16.5ZM7.2 12.3l2 2M10.2 9.3l2 2M13.2 6.3l2 2" />,
  diamond: <path d="M6.5 4h11l3.5 5-9 11-9-11 3.5-5ZM3 9h18M9.8 4 8.2 9 12 20l3.8-11-1.6-5" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="0.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2" />
    </>
  ),
  shield: <path d="M12 3 5 6v5.5c0 4.4 2.9 7.9 7 9.5 4.1-1.6 7-5.1 7-9.5V6l-7-3ZM9 12l2 2 4-4" />,
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c.8-3.5 3.6-5.6 7-5.6s6.2 2.1 7 5.6" />
    </>
  ),
  trowel: <path d="M14 4.5 19.5 10 12 13.5 10.5 12 14 4.5ZM10.5 12l-6 6a1.4 1.4 0 0 0 2 2l6-6" />,
  smile: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 14c.9 1.3 2.1 2 3.5 2s2.6-.7 3.5-2M9.2 9.6h.01M14.8 9.6h.01" />
    </>
  ),
  paintRoller: <path d="M4 4h13v5H4V4ZM17 6.5h3v5h-8v3M11 14.5h2V21h-2v-6.5Z" />,
  droplet: <path d="M12 3.5s6 6.1 6 10.4a6 6 0 0 1-12 0c0-4.3 6-10.4 6-10.4Z" />,
  sparkle: <path d="M12 3.5c.6 4.4 2.1 5.9 6.5 6.5-4.4.6-5.9 2.1-6.5 6.5-.6-4.4-2.1-5.9-6.5-6.5 4.4-.6 5.9-2.1 6.5-6.5ZM18.5 15.5c.3 1.9.9 2.5 2.5 2.7-1.6.3-2.2.9-2.5 2.8-.3-1.9-.9-2.5-2.5-2.8 1.6-.2 2.2-.8 2.5-2.7Z" />,
  accessibility: (
    <>
      <circle cx="12" cy="4.8" r="1.8" />
      <path d="M5 8.5c2.3.7 4.6 1 7 1s4.7-.3 7-1M12 9.5V14M12 14l-3 6.5M12 14l3 6.5" />
    </>
  ),
  shower: <path d="M5 21V7.5A3.5 3.5 0 0 1 8.5 4h0A3.5 3.5 0 0 1 12 7.5V8M9 8h6M10 11.5v.01M12 12.5v.01M14 11.5v.01M11 14.5v.01M13 14.5v.01M12 17v.01" />,
  feather: <path d="M19.5 4.5c-5.5 0-11 3.5-11 11v4M8.5 15.5c3.5 0 9-1.5 11-11M8.5 15.5 4.5 19.5M12 12h4.5" />,
  paperclip: <path d="m19.5 11.5-7.4 7.4a4.6 4.6 0 0 1-6.5-6.5l7.8-7.8a3 3 0 0 1 4.3 4.3l-7.8 7.8a1.5 1.5 0 0 1-2.1-2.1l7-7" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5.5M12 16.2v.01" />
    </>
  ),
  arrowDown: <path d="M12 4v15.5M6 13.5l6 6 6-6" />,
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="0.5" />
      <path d="m3 16 5-5 5 5 3-3 5 5" />
      <circle cx="15.5" cy="8.5" r="1.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  facebook: <path d="M14 8.5V6.8c0-.8.4-1.3 1.3-1.3H17V2.8h-2.5c-2.6 0-3.8 1.6-3.8 3.9v1.8H8.5v2.8h2.2v9.9H14v-9.9h2.6l.4-2.8h-3Z" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17.2 6.8h.01" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1" />
      <path d="M8 10.5V17M8 7.5v.01M11.8 17v-6.5M11.8 13.2c0-1.7 1-2.8 2.4-2.8s2.1 1 2.1 2.6V17" />
    </>
  ),
  google: <path d="M20 12.2c0-.6-.1-1.1-.2-1.7H12v3.3h4.5a4.8 4.8 0 0 1-2 2.8v2.2h3.2c1.9-1.7 2.3-4.2 2.3-6.6ZM12 20.5c2.4 0 4.4-.8 5.7-2.1l-3.2-2.3c-.7.5-1.7.8-2.6.8a4.6 4.6 0 0 1-4.3-3.2H4.3v2.4a8.5 8.5 0 0 0 7.7 4.4ZM7.6 13.7a4.8 4.8 0 0 1 0-3.4V7.9H4.3a8.5 8.5 0 0 0 0 7.8l3.3-2ZM12 7.3c1.3 0 2.4.4 3.3 1.3l2.5-2.5A8.5 8.5 0 0 0 4.3 8l3.3 2.4A4.6 4.6 0 0 1 12 7.3Z" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  name: IconName;
  /** Libellé accessible si l'icône est porteuse de sens à elle seule. */
  title?: string;
}

export function Icon({ name, title, className, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-5 w-5"}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {icons[name]}
    </svg>
  );
}
