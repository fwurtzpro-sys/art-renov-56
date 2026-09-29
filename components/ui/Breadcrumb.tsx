import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { getBreadcrumbTrail } from "@/config/routes";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import type { RouteKey } from "@/types";

interface BreadcrumbProps {
  /** Page courante (le fil est déduit du registre des routes). */
  route?: RouteKey;
  /** Ou fil explicite (ex. fiche réalisation). */
  trail?: ReadonlyArray<{ name: string; path: string }>;
  className?: string;
}

/** Fil d'Ariane visible + données structurées BreadcrumbList. */
export function Breadcrumb({ route, trail, className }: BreadcrumbProps) {
  const items = trail ?? (route ? getBreadcrumbTrail(route) : []);
  if (items.length < 2) return null;

  return (
    <>
      <nav aria-label="Fil d'Ariane" className={cn("text-[0.75rem] tracking-[0.06em]", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <Fragment key={item.path}>
                <li>
                  {isLast ? (
                    <span aria-current="page" className="text-fg">
                      {item.name}
                    </span>
                  ) : (
                    <Link href={item.path} className="link-underline transition-colors hover:text-fg">
                      {item.name}
                    </Link>
                  )}
                </li>
                {!isLast ? (
                  <li aria-hidden className="text-or">
                    ›
                  </li>
                ) : null}
              </Fragment>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
