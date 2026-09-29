import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export type SectionTone = "dark" | "anthracite" | "light" | "light-alt";

const toneClasses: Record<SectionTone, string> = {
  // --tone-bg : fond de la section · --cell-bg : cellules des grilles · --surface : cartes.
  // Sur fond clair, cellules et cartes sont d'un ivoire / blanc chaud légèrement différencié.
  dark: "tone-dark bg-noir text-ivoire [--tone-bg:#0B0B0A] [--cell-bg:#0B0B0A] [--surface:#1C1B19]",
  anthracite: "tone-dark bg-anthracite text-ivoire [--tone-bg:#1C1B19] [--cell-bg:#1C1B19] [--surface:#262522]",
  light: "tone-light bg-ivoire text-encre [--tone-bg:#F5F0E6] [--cell-bg:#FBF8F2] [--surface:#FBF8F2]",
  "light-alt": "tone-light bg-ivoire-50 text-encre [--tone-bg:#FBF8F2] [--cell-bg:#FFFDF9] [--surface:#FFFDF9]",
};

const spacingClasses = {
  default: "py-section",
  compact: "py-section-sm",
  none: "",
} as const;

interface SectionProps {
  children: ReactNode;
  tone?: SectionTone;
  spacing?: keyof typeof spacingClasses;
  id?: string;
  /** id du titre de la section (landmark accessible). */
  labelledBy?: string;
  className?: string;
  /** Envelopper le contenu dans un Container (par défaut : oui). */
  contained?: boolean;
  containerClassName?: string;
}

/**
 * Section pleine largeur au fond noir ou ivoire. Définit aussi le « ton »
 * (couleurs d'accent, de texte secondaire et de focus adaptées au fond).
 */
export function Section({
  children,
  tone = "light",
  spacing = "default",
  id,
  labelledBy,
  className,
  contained = true,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative", toneClasses[tone], spacingClasses[spacing], className)}
    >
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  );
}

export function toneClass(tone: SectionTone): string {
  return toneClasses[tone];
}
