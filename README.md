# ART RÉNOV 56 — site public

Site de l'entreprise ART RÉNOV 56 (rénovation intérieure & aménagement, Elven — Morbihan).
Next.js (App Router) · React · TypeScript · Tailwind CSS. Aucune dépendance à Vercel.

## Commandes

```bash
npm install
npm run dev     # développement
npm run lint
npm run build   # build de production
npm run start   # serveur de production (Node.js)
```

Copier `.env.example` en `.env.local` et renseigner les valeurs.

## Architecture

```
app/
  layout.tsx            document HTML, typographies (next/font), métadonnées globales
  (site)/               site public (header + footer + JSON-LD entreprise)
  not-found.tsx         404 (recompose header + footer)
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx apple-icon.tsx icon.svg
components/
  ui/                   Container, Section (tons noir/ivoire), SectionHeading, Button,
                        Icon (SVG maison), Photo, Breadcrumb, JsonLd
  layout/               Header, DesktopNav, MobileMenu, Footer, Logo, SiteShell
config/
  site.ts               ⚠️ source unique : entreprise, coordonnées, légal, réseaux, horaires
  routes.ts             registre des routes, fil d'Ariane, redirections 301
  navigation.ts         menus header / footer, libellés du CTA devis
data/                   prestations, réalisations, FAQ, registre des images (media.ts)
lib/                    seo.ts (metadata), schema.ts (JSON-LD), utils.ts
types/                  types partagés (dont Lead, prévu pour le futur CRM)
assets/fonts/           police utilisée au build pour l'image Open Graph
```

## Règles de contenu

- **Aucune information inventée.** Une donnée inconnue vaut `A_RENSEIGNER` dans
  `config/site.ts` : elle est masquée sur le site et jamais émise en données structurées.
- Téléphone, email et adresse restent « À RENSEIGNER » tant que l'entreprise ne les a pas confirmés : ils ne sont ni affichés ni émis dans Schema.org.
- Aucun faux chantier ni faux avis. Les projets d'illustration portent `isPlaceholder: true`.
- Remplacer une photo : déposer le fichier dans `public/images/…` puis renseigner l'entrée
  correspondante de `data/media.ts`. Un emplacement vide affiche un placeholder sans décalage.

## SEO

- Métadonnées par page via `pageMetadata()` (title, description, canonical, Open Graph).
- Une page entre dans le sitemap en passant `ready: true` dans `config/routes.ts`.
- `SITE_NOINDEX=true` (préproduction) bloque robots.txt et ajoute `noindex`.

## Futur espace client / CRM

Non développé. Préparé par : groupe de routes `(site)` isolé (un groupe `(espace-client)`
aura son propre layout), préfixes `/espace-client`, `/admin`, `/api/` exclus de l'indexation,
type `Lead` pour les demandes de devis.

## Formulaire de contact

`POST /api/contact` (Node.js requis) : contrôle d'origine, limitation de débit, honeypot + temps
minimal de saisie, validation serveur (`lib/contact.ts`, partagée avec le client), pièces jointes
vérifiées par signature binaire (5 fichiers, 5 Mo max), envoi SMTP (`lib/leads.ts`), rien n'est
stocké. Tant que les variables `SMTP_*` / `CONTACT_*` de `.env.example` ne sont pas renseignées,
l'API répond 503 et le visiteur en est informé.

## Consentement

`config/consent.ts` : liste vide = aucun service soumis à consentement, donc pas de bandeau.
Ajouter une catégorie active le bandeau (Tout accepter / Tout refuser / Personnaliser) ;
charger les scripts concernés uniquement via `<ConsentGate>`.
