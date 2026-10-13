# Déploiement Hostinger sans hPanel (GitHub Actions → SSH → Passenger)

Pourquoi : le bouton « Redéployer » de hPanel échoue (« Échec de l'enregistrement des paramètres de
déploiement », problème côté Hostinger) et le build ne passe pas sur le serveur (`spawn node EAGAIN`).
Ici le site est construit **sur GitHub**, envoyé en SSH, installé comme **nouvelle version** à côté de
l'ancienne (`hbuilds/versions/<id>`), testé en local sur le serveur, puis — seulement si activé — bascule.

## Fonctionnement à chaque push sur `production`
1. `build` (toujours) : `npm ci`, lint, build, archive conservée 30 jours dans l'onglet Actions.
2. `deploy` (si la variable `HOSTINGER_DEPLOY` = `true`) : envoi, installation, test. **Pas de bascule**
   sauf si la variable `HOSTINGER_AUTO_SWITCH` = `true` (ou lancement manuel avec « basculer = true »).
3. Retour arrière : `bash ~/art-renov56-deploy/basculer.sh precedente`.

## Indexation
`SITE_NOINDEX` vaut **true par défaut** (balise `noindex`, `robots.txt` en `Disallow: /`). Pour rendre
le site indexable : variable GitHub `SITE_NOINDEX` = `false`, et uniquement sur décision explicite.

## Mise en place (une seule fois)
- Variables (Settings → Secrets and variables → Actions → *Variables*) : `HOSTINGER_DEPLOY=true`
  (+ `NEXT_PUBLIC_SITE_URL` si différent de https://art-renov56.com).
- Secrets : `HOSTINGER_SSH_HOST`, `HOSTINGER_SSH_PORT`, `HOSTINGER_SSH_USER`, `HOSTINGER_SSH_KEY`
  (clé privée dédiée, voir la commande de création dans le message de livraison).

## Sans GitHub Actions
L'archive du build est téléchargeable depuis l'onglet Actions (artefact « artefact-hostinger »).
Déposer dans `~/art-renov56-deploy/inbox/` puis : `bash ~/art-renov56-deploy/deployer.sh <archive>`.
