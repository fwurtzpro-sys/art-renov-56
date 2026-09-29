import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/** Structure commune du site public : lien d'évitement, header, contenu, footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-[100] bg-or px-5 py-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-noir focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
