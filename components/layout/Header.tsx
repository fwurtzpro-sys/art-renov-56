import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { mainNav, quoteCta } from "@/config/navigation";
import { getEmail, getPhone } from "@/config/site";

/**
 * Header global marine.
 * Desktop (≥ 1280 px) : logo · navigation · CTA devis.
 * Mobile / tablette : logo · CTA devis simplifié · bouton menu.
 */
export function Header() {
  const phone = getPhone();
  const email = getEmail();

  return (
    <header className="tone-dark sticky top-0 z-50 border-b border-line bg-marine text-ivoire">
      <div className="header-in">
      <Container size="wide" className="flex h-header items-center justify-between gap-4 xl:h-header-xl xl:gap-6">
        <Logo />

        <DesktopNav items={mainNav} />

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-4 xl:gap-5 wide:gap-6">
          {/* CTA desktop : encadré doré sur deux lignes */}
          <Link
            href={quoteCta.href}
            className="group relative isolate hidden shrink-0 flex-col items-center overflow-hidden whitespace-nowrap border border-or px-5 py-3 wide:py-2.5 text-center before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-or before:transition-transform before:duration-300 before:ease-premium hover:before:scale-x-100 focus-visible:before:scale-x-100 motion-reduce:before:transition-none xl:flex"
          >
            <span className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-or transition-colors group-hover:text-marine">
              {quoteCta.label}
            </span>
            <span className="mt-1 hidden text-[0.5625rem] font-medium uppercase tracking-[0.12em] text-ivoire/70 transition-colors group-hover:text-marine wide:block">
              {quoteCta.sublabel}
            </span>
          </Link>

          {/* CTA mobile / tablette simplifié */}
          <Link
            href={quoteCta.href}
            className="inline-flex min-h-[44px] shrink-0 items-center border border-or px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-or transition-colors hover:bg-or hover:text-marine sm:px-5 xl:hidden"
          >
            Devis<span className="hidden sm:inline">&nbsp;gratuit</span>
          </Link>

          <MobileMenu items={mainNav} cta={{ label: quoteCta.long, href: quoteCta.href }} phone={phone} email={email} />
        </div>
      </Container>
      </div>
    </header>
  );
}
