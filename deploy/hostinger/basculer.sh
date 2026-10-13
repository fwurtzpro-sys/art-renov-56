#!/usr/bin/env bash
# Repointe `current` puis demande à Passenger de redémarrer (restart.txt).
# Usage : basculer.sh nouvelle     (met en ligne la version préparée)
#         basculer.sh precedente   (RETOUR ARRIÈRE immédiat)
set -euo pipefail
. "$(dirname "$0")/config.sh"
case "${1:-}" in
  nouvelle) target="$(cat "$STATE/version-nouvelle.txt")"; readlink -f "$H/current" > "$STATE/version-precedente.txt";;
  precedente) target="$(cat "$STATE/version-precedente.txt")";;
  *) echo "Usage: $0 nouvelle|precedente"; exit 1;;
esac
[ -f "$target/nodejs/server.js" ] || { echo "Version cible invalide : $target"; exit 1; }
before="$(readlink "$H/current")"
ln -sfn "versions/$(basename "$target")" "$H/current.tmp"; mv -T "$H/current.tmp" "$H/current"
mkdir -p "$H/current/nodejs/tmp"; touch "$H/current/nodejs/tmp/restart.txt"
echo "current : $before  ->  $(readlink "$H/current")"
echo "Redémarrage Passenger demandé (restart.txt). Vérifiez le site ; sinon bouton « Redémarrer » de hPanel."
