"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "ar56:querychange";

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(EVENT, callback);
  };
}

/**
 * Lit / écrit un paramètre d'URL sans rendre la page dynamique.
 * Au rendu serveur (et à l'hydratation) la valeur vaut `null` : le HTML statique
 * reste complet, puis le client applique le paramètre éventuel.
 */
export function useQueryParam(name: string): [string | null, (value: string | null) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );

  const setValue = useCallback(
    (next: string | null) => {
      const url = new URL(window.location.href);
      if (next) url.searchParams.set(name, next);
      else url.searchParams.delete(name);
      window.history.replaceState(window.history.state, "", url);
      window.dispatchEvent(new Event(EVENT));
    },
    [name],
  );

  return [value, setValue];
}
