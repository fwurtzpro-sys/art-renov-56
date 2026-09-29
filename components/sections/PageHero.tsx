import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Photo } from "@/components/ui/Photo";
import type { MediaKey, RouteKey } from "@/types";

interface PageHeroProps {
  route: RouteKey;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Photo d'arrière-plan (sinon : héros typographique sobre). */
  media?: MediaKey;
  children?: ReactNode;
}

/** Héros compact des pages intérieures : fond marine, photo voilée optionnelle, fil d'Ariane. */
export function PageHero({ route, eyebrow, title, intro, media, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-titre" className="tone-dark relative isolate overflow-hidden bg-marine text-ivoire">
      {media ? (
        <>
          <Photo media={media} sizes="100vw" priority className="absolute inset-0 -z-20" frameClassName="h-full w-full" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-marine via-marine/80 to-marine/40" />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 lg:block"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgb(184 149 90 / 0.07) 0 1px, transparent 1px 96px), repeating-linear-gradient(0deg, rgb(184 149 90 / 0.07) 0 1px, transparent 1px 96px)",
          }}
        />
      )}
      <Container className={cn("pb-20 pt-10 sm:pb-24 lg:pb-28", media && "lg:pb-32")}>
        <Breadcrumb route={route} />
        <div className="animate-fade-up mt-14 max-w-3xl lg:mt-20">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="page-titre" className="mt-6 font-serif text-display-lg font-medium">
            {title}
          </h1>
          {intro ? <div className="mt-7 max-w-2xl text-lead text-ivoire/80">{intro}</div> : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
