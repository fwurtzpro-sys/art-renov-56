import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

interface Crumb {
  label: string;
  href: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="bg-anthracite pb-16 pt-40 text-creme md:pb-20 md:pt-48">
      <Container>
        <nav aria-label="Fil d'Ariane">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ardoise-300">
            {crumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="size-3" aria-hidden="true" />
                )}
                {index === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-creme">
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-creme">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow && (
          <Reveal>
            <p className="mb-4 mt-8 text-xs font-medium uppercase tracking-[0.2em] text-pierre-400">
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1
            className={`font-display text-4xl leading-tight tracking-tightest sm:text-5xl md:text-6xl ${eyebrow ? "" : "mt-8"}`}
          >
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ardoise-200 md:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
