import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { quoteCta } from "@/config/navigation";

interface CtaBandProps {
  tone?: "dark" | "light";
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
  id?: string;
}

/** Bande d'appel à l'action (devis) — noire ou claire. */
export function CtaBand({
  tone = "dark",
  eyebrow,
  title,
  text,
  cta = { label: quoteCta.long, href: quoteCta.href },
  secondary,
  id = "cta-titre",
}: CtaBandProps) {
  return (
    <Section tone={tone} spacing="compact" labelledBy={id}>
      <div className="flex flex-col gap-10 border-y border-line py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16">
        <div className="max-w-2xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 id={id} className="mt-5 font-serif text-display-md font-medium text-fg first:mt-0">
            {title}
          </h2>
          {text ? <p className="mt-5 text-lead text-muted">{text}</p> : null}
        </div>
        <div className="flex shrink-0 flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
          <ButtonLink href={cta.href} variant={tone === "dark" ? "gold" : "dark"} size="lg">
            {cta.label}
          </ButtonLink>
          {secondary ? (
            <ButtonLink href={secondary.href} variant="outline" size="lg">
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
