"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/zones";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const pathname = usePathname();
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium",
        solid ? "bg-creme/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between md:h-24">
          <Link
            href="/"
            className={cn(
              "font-display text-xl tracking-tight transition-colors duration-500 md:text-2xl",
              solid ? "text-anthracite" : "text-creme"
            )}
            onClick={() => setOpen(false)}
          >
            Art Renov <span className="text-breton-500">56</span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative py-1 text-sm font-medium tracking-wide transition-colors duration-500",
                    solid
                      ? cn(
                          "text-anthracite/80 hover:text-anthracite",
                          isActive && "text-anthracite"
                        )
                      : cn(
                          "text-creme/80 hover:text-creme",
                          isActive && "text-creme"
                        )
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-breton-500 transition-all duration-300 ease-premium",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/devis"
              className={cn(
                "inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium transition-colors duration-300",
                solid
                  ? "border-transparent bg-ardoise-900 text-creme hover:bg-ardoise-800"
                  : "border-creme/40 bg-transparent text-creme hover:border-creme hover:bg-creme/10"
              )}
            >
              Demander un devis
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex size-11 items-center justify-center rounded-full transition-colors duration-500 lg:hidden",
              solid ? "text-anthracite" : "text-creme"
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-creme lg:hidden"
          >
            <Container>
              <nav
                className="flex flex-col gap-1 pb-8 pt-2"
                aria-label="Navigation mobile"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "border-b border-ardoise-100 py-4 text-lg font-medium text-anthracite transition-colors duration-200 active:text-breton-600",
                      pathname === link.href && "text-breton-600"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/devis"
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-ardoise-900 px-6 py-4 text-sm font-medium text-creme"
                >
                  Demander un devis
                </Link>
                <a
                  href={`tel:${company.phone}`}
                  className="mt-4 text-center text-sm text-ardoise-700"
                >
                  {company.phone}
                </a>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
