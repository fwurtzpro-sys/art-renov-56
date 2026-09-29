import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { routes } from "@/config/routes";
import { services } from "@/data/services";

/**
 * Les 5 prestations en cartes (accueil).
 * Grille architecturale : 3 cartes puis 2 cartes plus larges sur desktop.
 */
export function ServiceCards() {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
      {services.map((service, index) => {
        const wide = index >= 3;
        return (
          <li key={service.slug} className={cn(wide ? "lg:col-span-3" : "lg:col-span-2", index === 4 && "md:col-span-2 lg:col-span-3")}>
            <article className="group relative flex h-full flex-col border border-line bg-anthracite transition-colors duration-500 focus-within:border-or hover:border-or/60">
              <Photo
                media={service.image}
                sizes={wide ? "(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                frameClassName={wide ? "aspect-[16/9]" : "aspect-[4/3]"}
                hoverZoom
              />
              <div className="flex flex-1 flex-col p-7 lg:p-8">
                <Icon name={service.icon} className="h-7 w-7 text-or" />
                <h3 className="mt-5 font-serif text-display-sm font-medium text-ivoire">
                  <Link
                    href={routes[service.routeKey].path}
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                  >
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{service.excerpt}</p>
                <span
                  aria-hidden
                  className="mt-6 inline-flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-or"
                >
                  Découvrir
                  <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
