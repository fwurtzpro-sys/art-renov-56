import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow ? <p className={cn("eyebrow", centered && "eyebrow-center justify-center")}>{eyebrow}</p> : null}
      <Tag id={id} className={cn("font-serif font-medium text-fg", sizeClasses[size], eyebrow && "mt-5")}>
        {title}
      </Tag>
      {intro ? <div className={cn("mt-6 text-lead text-muted", centered && "mx-auto max-w-prose")}>{intro}</div> : null}
    </div>
  );
}

/** Mot doré en italique dans un titre serif. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="accent-word">{children}</span>;
}
