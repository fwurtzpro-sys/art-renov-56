import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

type HeadingLevel = "h1" | "h2" | "h3";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: HeadingLevel;
  id?: string;
  align?: "left" | "center";
  size?: "xl" | "lg" | "md" | "sm";
  className?: string;
}

const sizeClasses = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-display-sm",
} as const;

/**
 * Surtitre doré + grand titre serif + introduction courte.
 * Pour mettre un mot en valeur : <Accent>mot</Accent> dans `title`.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  id,
  align = "left",
  size = "lg",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Stagger className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow ? (
        <StaggerItem as="p" className={cn("eyebrow", centered && "eyebrow-center justify-center")}>
          {eyebrow}
        </StaggerItem>
      ) : null}
      <StaggerItem as={Tag} id={id} className={cn("font-serif font-medium text-fg", sizeClasses[size], eyebrow && "mt-5")}>
        {title}
      </StaggerItem>
      {intro ? (
        <StaggerItem className={cn("mt-6 text-lead text-muted", centered && "mx-auto max-w-prose")}>{intro}</StaggerItem>
      ) : null}
    </Stagger>
  );
}

/** Mot doré en italique dans un titre serif. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="accent-word">{children}</span>;
}
