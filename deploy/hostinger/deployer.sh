#!/usr/bin/env bash
# Installe la nouvelle version à côté de l'ancienne, la teste, et (si demandé) bascule.
# Usage : deployer.sh <archive.tgz> [--basculer]
set -euo pipefail
D="$(cd "$(dirname "$0")" && pwd)"
bash "$D/installer-version.sh" "$1" --appliquer
bash "$D/tester-version.sh"
if [ "${2:-}" = "--basculer" ]; then
  bash "$D/basculer.sh" nouvelle
else
  echo; echo "Prêt, NON basculé. Mise en ligne :  bash $D/basculer.sh nouvelle      Retour arrière :  bash $D/basculer.sh precedente"
fi
