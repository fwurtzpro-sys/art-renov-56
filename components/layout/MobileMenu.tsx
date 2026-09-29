"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/Button";
import { isActivePath } from "@/components/layout/DesktopNav";
import type { NavItem } from "@/types";

interface MobileMenuProps {
  items: ReadonlyArray<NavItem>;
  cta: { label: string; href: string };
  phone: { display: string; href: string } | null;
  email: { display: string; href: string } | null;
}

const PANEL_ID = "menu-mobile";

/**
 * Menu mobile / tablette : panneau plein écran modal.
 * Focus piégé, fermeture par Échap, verrouillage du défilement,
 * retour du focus au bouton d'ouverture.
 */
export function MobileMenu({ items, cta, phone, email }: MobileMenuProps) {
  const pathname = usePathname();
  // Ouvert pour une page donnée : se referme automatiquement au changement de route.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  const close = () => setOpenFor(null);

  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      wasOpen.current = true;
      root.style.overflow = "hidden";
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      root.style.overflow = "";
      toggleRef.current?.focus();
    }
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const linkClass = (active: boolean) =>
    cn(
      "flex min-h-[52px] items-center justify-between gap-4 border-b border-line py-3 font-sans text-[0.9375rem] font-semibold uppercase tracking-[0.12em] transition-colors",
      active ? "text-or" : "text-ivoire hover:text-or",
    );

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label="Ouvrir le menu"
        onClick={() => setOpenFor(pathname)}
        className="inline-flex h-11 w-11 items-center justify-center text-ivoire transition-colors hover:text-or xl:hidden"
      >
        <Icon name="menu" className="h-6 w-6" />
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={PANEL_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onKeyDown={onKeyDown}
          className="tone-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-marine text-ivoire xl:hidden"
        >
          <div className="flex h-header shrink-0 items-center justify-between border-b border-line px-5 sm:px-8">
            <span className="font-serif text-[1.4rem] tracking-[0.04em]">
              ART RÉNOV <span className="text-or">56</span>
            </span>
            <button
              type="button"
              data-autofocus
              aria-label="Fermer le menu"
              onClick={close}
              className="inline-flex h-11 w-11 items-center justify-center text-ivoire transition-colors hover:text-or"
            >
              <Icon name="close" className="h-6 w-6" />
            </button>
          </div>

          <nav aria-label="Navigation mobile" className="flex-1 px-5 pb-8 pt-4 sm:px-8">
            <ul>
              {items.map((item) => {
                const active = isActivePath(pathname, item);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={linkClass(active && !item.children)}
                    >
                      {item.label}
                      {pathname === item.href ? <span aria-hidden className="h-px w-6 bg-or" /> : null}
                    </Link>
                    {item.children ? (
                      <ul className="border-b border-line py-2 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={close}
                              aria-current={pathname === child.href ? "page" : undefined}
                              className={cn(
                                "flex min-h-[44px] items-center gap-3 text-[0.9375rem] transition-colors",
                                pathname === child.href ? "text-or" : "text-ivoire/75 hover:text-ivoire",
                              )}
                            >
                              <span aria-hidden className="h-px w-3 bg-or/70" />
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 space-y-5">
              <Link href={cta.href} onClick={close} className={buttonClasses({ variant: "gold", size: "lg", fullWidth: true })}>
                {cta.label}
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              {phone ? (
                <a href={phone.href} className="flex min-h-[44px] items-center gap-3 text-[1rem] text-ivoire">
                  <Icon name="phone" className="h-5 w-5 text-or" />
                  {phone.display}
                </a>
              ) : null}
              {email ? (
                <a href={email.href} className="flex min-h-[44px] items-center gap-3 break-all text-[0.9375rem] text-ivoire/80">
                  <Icon name="mail" className="h-5 w-5 shrink-0 text-or" />
                  {email.display}
                </a>
              ) : null}
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
