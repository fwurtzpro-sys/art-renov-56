#!/usr/bin/env bash
# Construit l'archive de déploiement (build Next.js « standalone » + fichiers statiques + public).
# Sûr par défaut : SITE_NOINDEX vaut "true" sauf si on le règle explicitement sur "false".
# Usage : build-artifact.sh [dossier-de-sortie]   (défaut : dist)
set -euo pipefail
OUT="${1:-dist}"
export SITE_NOINDEX="${SITE_NOINDEX:-true}"
export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://art-renov56.com}"
export BUILD_STANDALONE=1
echo "Build : SITE_NOINDEX=$SITE_NOINDEX ; NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL"
npm run build
[ -f .next/standalone/server.js ] || { echo "ERREUR : .next/standalone/server.js absent"; exit 1; }
mkdir -p "$OUT/pkg"
cp -a .next/standalone/. "$OUT/pkg/"
mkdir -p "$OUT/pkg/.next"
cp -a .next/static "$OUT/pkg/.next/static"
[ -d public ] && cp -a public "$OUT/pkg/public"
NAME="artefact-art-renov56-$(git rev-parse --short HEAD 2>/dev/null || echo local).tgz"
tar czf "$OUT/$NAME" -C "$OUT/pkg" .
echo "$NAME" > "$OUT/NOM_ARCHIVE.txt"
ls -la "$OUT/$NAME"
