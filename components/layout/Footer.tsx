import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { footerQuickLinks, footerServiceLinks, legalNav, quoteCta } from "@/config/navigation";
import { getEmail, getPhone, getPublicLocality, getSocialLinks, isProvided, siteConfig } from "@/config/site";
import type { NavItem } from "@/types";

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-or">
      {children}
      <span aria-hidden className="h-px w-6 bg-or/60" />
    </h2>
  );
}

function FooterLinks({ title, links }: { title: string; links: ReadonlyArray<NavItem> }) {
  return (
    <nav aria-label={title}>
      <FooterHeading>{title}</FooterHeading>
      <ul className="mt-6 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-[36px] items-center text-[0.9375rem] text-ivoire/75 transition-colors hover:text-ivoire"
            >
              <span className="link-underline">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const phone = getPhone();
  const email = getEmail();
  const socials = getSocialLinks();
  const year = new Date().getFullYear();
  const { brand, credits, serviceArea } = siteConfig;

  return (
    <footer className="tone-dark border-t border-line bg-noir text-ivoire">
      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr_1.3fr] lg:gap-10">
          {/* 1 — Identité */}
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-8">
            <Logo size="lg" />
            <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-muted">{brand.shortDescription}</p>
            {socials.length > 0 ? (
              <ul className="mt-7 flex gap-3">
                {socials.map((social) => (
                  <li key={social.key}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center border border-line text-ivoire/80 transition-colors hover:border-or hover:text-or"
                    >
                      <Icon name={social.key} className="h-[1.125rem] w-[1.125rem]" title={`${brand.name} sur ${social.label}`} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* 2 — Liens rapides */}
          <FooterLinks title="Liens rapides" links={footerQuickLinks} />

          {/* 3 — Prestations */}
          <FooterLinks title="Prestations" links={footerServiceLinks} />

          {/* 4 — Contact */}
          <div>
            <FooterHeading>Contact</FooterHeading>
            <address className="mt-6 space-y-4 not-italic">
              {phone ? (
                <a href={phone.href} className="flex items-center gap-3 text-[0.9375rem] text-ivoire transition-colors hover:text-or">
                  <Icon name="phone" className="h-[1.125rem] w-[1.125rem] shrink-0 text-or" />
                  {phone.display}
                </a>
              ) : null}
              {email ? (
                <a href={email.href} className="flex items-center gap-3 break-all text-[0.9375rem] text-ivoire transition-colors hover:text-or">
                  <Icon name="mail" className="h-[1.125rem] w-[1.125rem] shrink-0 text-or" />
                  {email.display}
                </a>
              ) : null}
              <p className="flex items-start gap-3 text-[0.9375rem] text-ivoire/80">
                <Icon name="mapPin" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-or" />
                <span>
                  {getPublicLocality()}
                  <br />
                  <span className="text-muted">{serviceArea.label}</span>
                </span>
              </p>
            </address>
            <ButtonLink href={quoteCta.href} variant="gold" size="md" className="mt-8">
              {quoteCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-4 py-6 text-[0.8125rem] text-muted lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <p>
              © {year} {brand.name}. Tous droits réservés.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline transition-colors hover:text-ivoire">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {isProvided(credits.url) ? (
            <a href={credits.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ivoire">
              {credits.label}
            </a>
          ) : (
            <p>{credits.label}</p>
          )}
        </Container>
      </div>
    </footer>
  );
}
