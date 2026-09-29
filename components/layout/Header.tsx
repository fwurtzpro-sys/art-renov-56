import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/layout/Logo";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { mainNav, quoteCta } from "@/config/navigation";
import { getEmail, getPhone } from "@/config/site";

/**
 * Header global noir.
 * Desktop (≥ 1280 px) : logo · navigation · CTA devis · téléphone.
 * Mobile / tablette : logo · CTA devis simplifié · bouton menu.
 */
export function Header() {
  const phone = getPhone();
  const email = getEmail();

  return (
    <header className="tone-dark sticky top-0 z-50 border-b border-line bg-noir text-ivoire">
      <Container size="wide" className="flex h-header items-center justify-between gap-4 xl:h-header-xl xl:gap-6">
        <Logo />

        <DesktopNav items={mainNav} />

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-4 xl:gap-5 wide:gap-6">
          {/* CTA desktop : encadré doré sur deux lignes */}
          <Link
            href={quoteCta.href}
            className="group hidden shrink-0 flex-col items-center whitespace-nowrap border border-or px-5 py-3 wide:py-2.5 text-center transition-colors duration-300 hover:bg-or xl:flex"
          >
            <span className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-or transition-colors group-hover:text-noir">
              {quoteCta.label}
            </span>
            <span className="mt-1 hidden text-[0.5625rem] font-medium uppercase tracking-[0.12em] text-ivoire/70 transition-colors group-hover:text-noir wide:block">
              {quoteCta.sublabel}
            </span>
          </Link>

          {/* CTA mobile / tablette simplifié */}
          <Link
            href={quoteCta.href}
            className="inline-flex min-h-[44px] shrink-0 items-center border border-or px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-or transition-colors hover:bg-or hover:text-noir sm:px-5 xl:hidden"
          >
            Devis<span className="hidden sm:inline">&nbsp;gratuit</span>
          </Link>

          {phone ? (
            <a
              href={phone.href}
              className="hidden items-center gap-2.5 text-ivoire transition-colors hover:text-or xl:inline-flex"
              aria-label={`Appeler ART RÉNOV 56 au ${phone.display}`}
            >
              <Icon name="phone" className="h-[1.125rem] w-[1.125rem] text-or" />
              <span className="hidden whitespace-nowrap text-[0.875rem] font-medium tracking-[0.04em] wide:inline">
                {phone.display}
              </span>
            </a>
          ) : null}

          <MobileMenu items={mainNav} cta={{ label: quoteCta.long, href: quoteCta.href }} phone={phone} email={email} />
        </div>
      </Container>
    </header>
  );
}
