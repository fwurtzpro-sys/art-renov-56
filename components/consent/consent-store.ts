"use client";

import { useSyncExternalStore } from "react";
import { CONSENT_MAX_AGE_MS, CONSENT_STORAGE_KEY, CONSENT_VERSION } from "@/config/consent";

export interface ConsentState {
  version: number;
  date: number;
  choices: Record<string, boolean>;
}

const EVENT = "ar56:consentchange";
export const OPEN_PREFERENCES_EVENT = "ar56:open-consent";

function read(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const state = JSON.parse(raw) as ConsentState;
    if (state.version !== CONSENT_VERSION || Date.now() - state.date > CONSENT_MAX_AGE_MS) return null;
    return state;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Consentement enregistré (`undefined` côté serveur / avant hydratation, `null` si aucun choix). */
export function useConsent(): ConsentState | null | undefined {
  const raw = useSyncExternalStore(subscribe, read, () => undefined);
  return raw === undefined ? undefined : parse(raw);
}

export function saveConsent(choices: Record<string, boolean>) {
  const state: ConsentState = { version: CONSENT_VERSION, date: Date.now(), choices };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* stockage indisponible : le choix vaut pour la page courante uniquement */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
