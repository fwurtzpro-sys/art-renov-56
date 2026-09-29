import Link from "next/link";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { ArrowLink } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { services } from "@/data/services";

/** Grandes cartes horizontales des 5 prestations (page Prestations), image alternée. */
export function ServiceRows() {
  return (
    <Stagger as="ol" className="space-y-10 lg:space-y-16">
      {services.map((service, index) => {
        const path = routes[service.routeKey].path;
        const reversed = index % 2 === 1;
        return (
          <StaggerItem as="li" key={service.slug}>
            <article className="grid border border-line bg-ivoire-50 lg:grid-cols-2">
              <Link href={path} tabIndex={-1} aria-hidden className={cn("group block overflow-hidden", reversed && "lg:order-2")}>
                <Photo media={service.image} sizes="(min-width: 1024px) 50vw, 100vw" frameClassName="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px]" hoverZoom />
              </Link>
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-[2.25rem] leading-none text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <span aria-hidden className="h-px w-12 bg-or" />
                  <Icon name={service.icon} className="h-6 w-6 text-or" />
                </div>
                <h2 className="mt-6 font-serif text-display-md font-medium">
                  <Link href={path} className="transition-colors hover:text-or-fonce">
                    {service.name}
                  </Link>
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{service.description}</p>
                <ul className="mt-7 space-y-3">
                  {service.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-[0.9375rem]">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-or" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <ArrowLink href={path} className="mt-9">
                  Découvrir : {service.name}
                </ArrowLink>
              </div>
            </article>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
