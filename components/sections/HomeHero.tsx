import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Accent } from "@/components/ui/SectionHeading";
import { quoteCta } from "@/config/navigation";
import { href } from "@/config/routes";

/** Héros de l'accueil : grande photographie, voile sombre, H1, deux CTA. */
export function HomeHero() {
  return (
    <section
      aria-labelledby="accueil-titre"
      className="tone-dark relative isolate flex min-h-[calc(100svh-5rem)] items-end overflow-hidden bg-marine text-ivoire xl:min-h-[calc(100svh-6rem)]"
    >
      <Photo media="homeHero" sizes="100vw" priority className="absolute inset-0 -z-20" frameClassName="h-full w-full" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-marine/90 via-marine/60 to-marine/20" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-marine via-marine/50 to-transparent" />

      <Container className="animate-fade-up pb-20 pt-28 sm:pb-24 lg:pb-32">
        <p className="eyebrow">ART RÉNOV 56 • Morbihan</p>
        <h1 id="accueil-titre" className="mt-6 max-w-4xl font-serif text-display-xl font-medium text-ivoire">
          Rénovation intérieure <Accent>&amp; aménagement</Accent> dans le Morbihan
        </h1>
        <p className="mt-7 max-w-xl text-lead text-ivoire/80">
          Depuis Elven, nous rénovons et aménageons vos intérieurs avec soin, de l’étude de votre projet jusqu’aux
          dernières finitions.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href={quoteCta.href} variant="gold" size="lg">
            {quoteCta.long}
          </ButtonLink>
          <ButtonLink href={href("projects")} variant="outline" size="lg">
            Découvrir nos réalisations
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
