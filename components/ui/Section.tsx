import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export type SectionTone = "dark" | "anthracite" | "light" | "light-alt";

const toneClasses: Record<SectionTone, string> = {
  dark: "tone-dark bg-noir text-ivoire",
  anthracite: "tone-dark bg-anthracite text-ivoire",
  light: "tone-light bg-ivoire text-encre",
  "light-alt": "tone-light bg-ivoire-50 text-encre",
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
