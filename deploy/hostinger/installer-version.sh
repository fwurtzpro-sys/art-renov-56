#!/usr/bin/env bash
# Crée une NOUVELLE version Hostinger à côté de l'ancienne.
# Ne modifie ni `current`, ni l'ancienne version ; ne redémarre rien ; ne supprime rien.
# Usage : installer-version.sh <archive.tgz> [--appliquer]   (sans option : simulation)
set -euo pipefail
. "$(dirname "$0")/config.sh"
ARCHIVE="${1:?Usage: $0 <archive.tgz> [--appliquer]}"; APPLY="${2:-}"

[ -f "$ARCHIVE" ] || { echo "Archive introuvable : $ARCHIVE"; exit 1; }
[ -L "$H/current" ] || { echo "$H/current n'est pas un lien symbolique : arrêt."; exit 1; }
cur="$(readlink -f "$H/current")"
case "$cur" in "$H"/versions/*) ;; *) echo "current ne pointe pas dans $H/versions : arrêt."; exit 1;; esac
[ -f "$cur/nodejs/server.js" ] || { echo "Pas de nodejs/server.js dans la version actuelle : arrêt."; exit 1; }

echo "== Contrôle de l'archive"
list="$(mktemp)"; tar tzf "$ARCHIVE" > "$list"
for f in './server.js' './.next/BUILD_ID'; do
  grep -qxF "$f" "$list" || { echo "Absent de l'archive : $f"; rm -f "$list"; exit 1; }
done
grep -q '^\./\.next/static/' "$list" || { echo ".next/static absent de l'archive"; rm -f "$list"; exit 1; }
rm -f "$list"; echo "OK"

echo "== Espace (nouvelle version ≈ archive + ~80 Mo décompressés)"
echo "  taille archive : $(du -sk "$ARCHIVE" | cut -f1) Ko ; volume libre : $(df -Pk "$H" | awk 'NR==2{print int($4/1024)}') Mo"

new="$H/versions/$(cat /proc/sys/kernel/random/uuid)"
echo "== Plan"
echo "  version actuelle (intacte)  : $cur"
echo "  nouvelle version            : $new"
echo "  1. copie de tout sauf nodejs/ (ex. public_html/, .metadata.json)"
echo "  2. extraction de l'archive dans la nouvelle nodejs/ + création de nodejs/tmp (Passenger)"
echo "  current n'est PAS modifié ; aucun redémarrage."
[ "$APPLY" = "--appliquer" ] || { echo; echo "Simulation terminée : rien n'a été modifié."; exit 0; }

mkdir -p "$STATE"
echo "$cur" > "$STATE/version-precedente.txt"
mkdir "$new"
trap 'echo "ERREUR : installation interrompue. La version partielle $new peut être supprimée ; current n a pas été modifié."' ERR
( shopt -s dotglob nullglob; for e in "$cur"/*; do [ "$(basename "$e")" = "nodejs" ] || cp -a "$e" "$new/"; done )
mkdir "$new/nodejs"
tar xzf "$ARCHIVE" -C "$new/nodejs"
mkdir -p "$new/nodejs/tmp"
[ -f "$new/nodejs/server.js" ] || { echo "server.js manquant"; exit 1; }
echo "$new" > "$STATE/version-nouvelle.txt"
trap - ERR
echo; echo "Nouvelle version créée : $new"; echo "Version précédente enregistrée : $cur"
echo "Prochaine étape : tester-version.sh (aucun effet sur le site en ligne)."
