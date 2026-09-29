"use client";

import Link from "next/link";
import { useEffect, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/Button";
import { OPEN_PREFERENCES_EVENT, openConsentPreferences, saveConsent, useConsent } from "@/components/consent/consent-store";
import type { ConsentCategory } from "@/config/consent";

/**
 * Bandeau + centre de préférences.
 * « Tout refuser » est aussi visible et accessible que « Tout accepter » (aucun dark pattern).
 * Monté uniquement si au moins une catégorie soumise à consentement existe.
 */
export function ConsentManager({ categories, cookiesHref }: { categories: ReadonlyArray<ConsentCategory>; cookiesHref: string }) {
  const consent = useConsent();
  const [panelOpen, setPanelOpen] = useState(false);
  const [draft, setDraft] = useState<Record<string, boolean>>({});
  const titleId = useId();

  useEffect(() => {
    const open = () => setPanelOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  const all = (value: boolean) => Object.fromEntries(categories.map((category) => [category.id, value]));
  const decide = (choices: Record<string, boolean>) => {
    saveConsent(choices);
    setPanelOpen(false);
  };

  // Avant hydratation (undefined) : rien n'est affiché ; choix déjà fait (objet) : bandeau masqué.
  const showBanner = consent === null && !panelOpen;
  if (!showBanner && !panelOpen) return null;

  const actions: ReactNode = (
    <div className="grid gap-3 sm:grid-cols-3">
      <button type="button" onClick={() => decide(all(false))} className={buttonClasses({ variant: "outline", size: "sm" })}>
        Tout refuser
      </button>
      <button
        type="button"
        onClick={() => {
          setDraft({});
          setPanelOpen(true);
        }}
        className={buttonClasses({ variant: "outline", size: "sm" })}
      >
        Personnaliser
      </button>
      <button type="button" onClick={() => decide(all(true))} className={buttonClasses({ variant: "outline", size: "sm" })}>
        Tout accepter
      </button>
    </div>
  );

  return (
    <div
      role="dialog"
      aria-modal={panelOpen ? "true" : undefined}
      aria-labelledby={titleId}
      className={cn(
        "tone-dark fixed z-[70] border border-line bg-noir text-ivoire shadow-[0_0_0_1px_rgba(0,0,0,0.2)]",
        panelOpen ? "inset-x-3 bottom-3 max-h-[85vh] overflow-y-auto sm:inset-x-auto sm:right-6 sm:w-[32rem]" : "inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:w-[32rem]",
      )}
    >
      <div className="p-6 sm:p-7">
        <p id={titleId} className="font-serif text-[1.5rem] leading-tight">
          {panelOpen ? "Vos préférences" : "Cookies & confidentialité"}
        </p>
        {!panelOpen ? (
          <>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">
              Avec votre accord, nous utilisons des services optionnels. Vous pouvez accepter, refuser ou choisir, et modifier
              votre choix à tout moment depuis la page{" "}
              <Link href={cookiesHref} className="text-or underline underline-offset-4">
                Cookies
              </Link>
              .
            </p>
            <div className="mt-6">{actions}</div>
          </>
        ) : (
          <>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              <li className="flex items-start justify-between gap-6 py-4">
                <div>
                  <p className="text-[0.9375rem] font-semibold">Strictement nécessaires</p>
                  <p className="mt-1 text-[0.8125rem] text-muted">Fonctionnement du site et mémorisation de votre choix.</p>
                </div>
                <span className="shrink-0 text-[0.75rem] uppercase tracking-[0.14em] text-or">Toujours actifs</span>
              </li>
              {categories.map((category) => (
                <li key={category.id} className="flex items-start justify-between gap-6 py-4">
                  <label htmlFor={`consent-${category.id}`} className="cursor-pointer">
                    <span className="block text-[0.9375rem] font-semibold">{category.label}</span>
                    <span className="mt-1 block text-[0.8125rem] text-muted">
                      {category.description} ({category.services.join(", ")})
                    </span>
                  </label>
                  <input
                    id={`consent-${category.id}`}
                    type="checkbox"
                    checked={draft[category.id] ?? consent?.choices[category.id] ?? false}
                    onChange={(event) => setDraft((current) => ({ ...current, [category.id]: event.target.checked }))}
                    className="mt-1 h-5 w-5 shrink-0 accent-[#B8955A]"
                  />
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <button type="button" onClick={() => decide(all(false))} className={buttonClasses({ variant: "outline", size: "sm" })}>
                Tout refuser
              </button>
              <button type="button" onClick={() => decide(all(true))} className={buttonClasses({ variant: "outline", size: "sm" })}>
                Tout accepter
              </button>
              <button type="button" onClick={() => decide({ ...all(false), ...consent?.choices, ...draft })} className={buttonClasses({ variant: "gold", size: "sm" })}>
                Enregistrer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** Bouton « Gérer mes préférences » (page Cookies). */
export function ConsentPreferencesButton() {
  return (
    <button type="button" onClick={openConsentPreferences} className={buttonClasses({ variant: "dark", size: "md" })}>
      Gérer mes préférences
    </button>
  );
}

/** Rend ses enfants (ex. script d'audience) uniquement après consentement à la catégorie. */
export function ConsentGate({ category, children }: { category: string; children: ReactNode }) {
  const consent = useConsent();
  return consent?.choices[category] ? <>{children}</> : null;
}
