/**
 * Gestion du consentement (cookies / traceurs soumis à accord).
 *
 * Le site n'utilise actuellement AUCUN service soumis à consentement :
 * la liste est vide, le bandeau n'est donc pas affiché.
 *
 * Pour ajouter un service (ex. mesure d'audience avec cookies) :
 * 1. déclarer une catégorie ci-dessous ;
 * 2. charger le script uniquement via <ConsentGate category="…"> ;
 * 3. mettre à jour la page /cookies et la politique de confidentialité.
 */
export interface ConsentCategory {
  id: string;
  label: string;
  description: string;
  /** Services concernés, ex. ["Matomo"]. */
  services: ReadonlyArray<string>;
}

export const consentCategories: ReadonlyArray<ConsentCategory> = [];

export const CONSENT_STORAGE_KEY = "ar56-consent";
/** Incrémenter si les catégories changent : le choix est alors redemandé. */
export const CONSENT_VERSION = 1;
/** Durée de validité du choix (6 mois). */
export const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182;
