import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { href } from "@/config/routes";

/**
 * Page 404. Rendue hors du groupe (site) : recompose header et footer.
 * Next.js ajoute automatiquement `noindex` aux pages 404.
 */
export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

const shortcuts: ReadonlyArray<{ label: string; href: string; icon: IconName }> = [
  { label: "Découvrir nos prestations", href: href("services"), icon: "home" },
  { label: "Voir nos réalisations", href: href("projects"), icon: "image" },
  { label: "Zones d’intervention", href: href("areas"), icon: "mapPin" },
  { label: "Nous contacter", href: href("contact"), icon: "mail" },
];

export default function NotFound() {
  return (
    <SiteShell>
      <section aria-labelledby="erreur-titre" className="tone-light relative overflow-hidden bg-ivoire text-encre lg:grid lg:min-h-[calc(100svh-6rem)] lg:grid-cols-12">
        {/* Trame architecturale discrète */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgb(127 97 48 / 0.06) 0 1px, transparent 1px 120px), repeating-linear-gradient(0deg, rgb(127 97 48 / 0.06) 0 1px, transparent 1px 120px)",
          }}
        />

        <div className="relative flex flex-col justify-center px-5 py-16 sm:px-8 lg:col-span-7 lg:px-12 lg:py-14 xl:pl-[max(3rem,calc((100vw-82.5rem)/2+3rem))]">
          <p aria-hidden className="font-serif text-[clamp(5rem,3.5rem+6vw,8.5rem)] leading-[0.85] text-or-fonce">
            404
          </p>
          <h1 id="erreur-titre" className="mt-6 font-serif text-display-md font-medium">
            Oups ! Page introuvable
          </h1>
          <p className="mt-4 max-w-lg text-lead text-muted">La page que vous recherchez n’existe plus ou a été déplacée.</p>
          <ButtonLink href="/" variant="dark" size="lg" className="mt-8 self-start">
            Retour à l’accueil
          </ButtonLink>

          <div className="mt-10 max-w-xl border-t border-line pt-6">
            <p className="eyebrow">Besoin d’aide ?</p>
            <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
              {shortcuts.map((shortcut) => (
                <li key={shortcut.href}>
                  <Link
                    href={shortcut.href}
                    className="group flex min-h-[52px] items-center gap-4 border-b border-line py-3 text-[0.75rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-or-fonce"
                  >
                    <Icon name={shortcut.icon} className="h-5 w-5 shrink-0 text-or-fonce" />
                    {shortcut.label}
                    <Icon name="arrowRight" className="ml-auto h-4 w-4 shrink-0 text-or-fonce transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Photo
          media="notFoundInterior"
          sizes="(min-width: 1024px) 40vw, 100vw"
          frameClassName="aspect-[16/10] lg:aspect-auto lg:h-full"
          className="relative lg:col-span-5"
        />
      </section>
    </SiteShell>
  );
}
