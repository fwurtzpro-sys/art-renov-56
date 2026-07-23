import {
  Home,
  Building2,
  Paintbrush,
  LayoutGrid,
  PanelsTopLeft,
  Ruler,
  Wind,
  type LucideProps,
} from "lucide-react";

const icons = {
  Home,
  Building2,
  Paintbrush,
  LayoutGrid,
  PanelsTopLeft,
  Ruler,
  Wind,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const LucideIcon = icons[name as IconName] ?? Home;
  return <LucideIcon {...props} />;
}
