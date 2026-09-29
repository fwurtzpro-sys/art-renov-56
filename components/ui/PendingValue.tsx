import { cn } from "@/lib/utils";

/**
 * Marqueur visible d'une information réelle non encore fournie
 * (coordonnées, mentions légales…). `data-nosnippet` : jamais repris
 * dans les extraits des moteurs de recherche.
 */
export function PendingValue({ label = "À renseigner", className }: { label?: string; className?: string }) {
  return (
    <span
      data-nosnippet
      className={cn(
        "inline-flex items-center border border-dashed border-accent/70 px-2 py-0.5 align-middle font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-accent",
        className,
      )}
    >
      {label}
    </span>
  );
}
