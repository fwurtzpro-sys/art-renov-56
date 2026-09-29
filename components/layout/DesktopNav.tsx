"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as m from "motion/react-m";
import { panelTransition } from "@/lib/motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import type { NavItem } from "@/types";

export function isActivePath(pathname: string, item: NavItem): boolean {
  if (item.href === "/") return pathname === "/";
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  return item.children?.some((child) => isActivePath(pathname, child)) ?? false;
}

const linkBase =
  "group relative inline-flex h-full items-center whitespace-nowrap py-2 font-sans text-nav font-semibold uppercase text-ivoire/85 transition-colors duration-300 hover:text-ivoire";

/** Trait doré sous l'entrée active. */
function ActiveMark({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-or transition-transform duration-500 ease-premium",
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-[0.35]",
      )}
    />
  );
}

export function DesktopNav({ items }: { items: ReadonlyArray<NavItem> }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigation principale" className="hidden h-full xl:block">
      <ul className="flex h-full items-center gap-x-4 wide:gap-x-5">
        {items.map((item) => {
          const active = isActivePath(pathname, item);
          return (
            <li key={item.href} className="relative flex h-full items-center">
              {item.children ? (
                <NavDropdown item={item} active={active} pathname={pathname} />
              ) : (
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={linkBase}>
                  {item.label}
                  <ActiveMark active={active} />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function NavDropdown({ item, active, pathname }: { item: NavItem; active: boolean; pathname: string }) {
  const panelId = useId();
  // Le menu est ouvert pour une page donnée : il se referme de lui-même au changement de route.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  // Le panneau reste « visibility: hidden » tant que le fondu de fermeture n'est pas terminé (focus clavier possible dès l'ouverture).
  const [shut, setShut] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShut(false);
    setOpenFor(pathname);
  };
  const hide = () => setOpenFor(null);
  const scheduleHide = () => {
    closeTimer.current = setTimeout(hide, 120);
  };

  const focusLink = (index: number) => {
    const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a");
    if (!links || links.length === 0) return;
    links[(index + links.length) % links.length]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      hide();
      buttonRef.current?.focus();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const links = Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
      const current = links.indexOf(document.activeElement as HTMLAnchorElement);
      if (!open) show();
      requestAnimationFrame(() => {
        if (current === -1) focusLink(event.key === "ArrowDown" ? 0 : -1);
        else focusLink(current + (event.key === "ArrowDown" ? 1 : -1));
      });
    }
  };

  return (
    <div
      className="flex h-full items-center"
      onMouseEnter={show}
      onMouseLeave={scheduleHide}
      onKeyDown={onKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) hide();
      }}
    >
      <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={linkBase}>
        {item.label}
        <ActiveMark active={active} />
      </Link>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Afficher le sous-menu ${item.label}`}
        onClick={() => (open ? hide() : show())}
        className="ml-1 inline-flex h-8 w-6 items-center justify-center text-or"
      >
        <Icon name="chevronDown" className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")} />
      </button>

      {/* Toujours monté (navigation clavier) ; masqué à la fin du fondu de fermeture. */}
      <m.ul
        ref={panelRef}
        id={panelId}
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0, transition: panelTransition },
          closed: { opacity: 0, y: -8, transition: panelTransition },
        }}
        onAnimationComplete={(definition) => {
          if (definition === "closed") setShut(true);
        }}
        style={{ visibility: shut ? "hidden" : "visible" }}
        className="tone-dark absolute left-1/2 top-full z-50 -ml-36 w-72 border border-line border-t-or bg-marine py-3"
      >
        {item.children?.map((child) => {
          const current = pathname === child.href;
          return (
            <li key={child.href}>
              <Link
                href={child.href}
                aria-current={current ? "page" : undefined}
                onClick={hide}
                className={cn(
                  "group flex items-center justify-between gap-4 px-6 py-3 text-[0.875rem] text-ivoire/80 transition-colors hover:bg-marine-panel hover:text-ivoire",
                  current && "text-or",
                )}
              >
                {child.label}
                <Icon
                  name="arrowRight"
                  className="h-3.5 w-3.5 -translate-x-1 text-or opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </Link>
            </li>
          );
        })}
      </m.ul>
    </div>
  );
}
