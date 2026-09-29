import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";

export interface FeatureItem {
  title: string;
  text: ReactNode;
  icon?: IconName;
  /** Liste courte sous le texte (ex. équipements). */
  list?: ReadonlyArray<string>;
}

interface FeatureGridProps {
  items: ReadonlyArray<FeatureItem>;
  columns?: 3 | 4 | 5;
  /** "icon" : icône dorée ; "numbered" : 01, 02… ; "line" : simple trait doré. */
  variant?: "icon" | "numbered" | "line";
  className?: string;
}

const columnClasses = {
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
} as const;

/** Grille d'engagements / bénéfices : colonnes séparées par de fins filets. */
export function FeatureGrid({ items, columns = 4, variant = "icon", className }: FeatureGridProps) {
  return (
    <Stagger as="ul" className={cn("grid gap-px border-y border-line bg-line", columnClasses[columns], className)}>
      {items.map((item, index) => (
        <li key={item.title} className="bg-[var(--tone-bg)]">
          {/* Le fond de la cellule reste en place : seul son contenu apparaît (les filets ne « clignotent » pas). */}
          <StaggerItem className="flex h-full flex-col px-6 py-10 sm:px-8 lg:py-12">
          {variant === "icon" && item.icon ? (
            <span className="flex h-14 w-14 items-center justify-center border border-or/50">
              <Icon name={item.icon} className="h-7 w-7 text-or" />
            </span>
          ) : null}
          {variant === "numbered" ? (
            <span aria-hidden className="font-serif text-[2.5rem] leading-none text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
          {variant === "line" ? <span aria-hidden className="block h-px w-10 bg-or" /> : null}
          <h3 className="mt-7 font-sans text-[0.875rem] font-semibold uppercase tracking-[0.16em] text-fg">{item.title}</h3>
          <div className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{item.text}</div>
          {item.list ? (
            <ul className="mt-5 space-y-2 text-[0.9375rem] text-fg">
              {item.list.map((entry) => (
                <li key={entry} className="flex items-start gap-3">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-or" />
                  {entry}
                </li>
              ))}
            </ul>
          ) : null}
          </StaggerItem>
        </li>
      ))}
    </Stagger>
  );
}
