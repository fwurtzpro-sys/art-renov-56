#!/usr/bin/env bash
# Démarre la NOUVELLE version sur un port local, la teste sans curl (sonde Node), puis l'arrête.
# Ne touche ni au site en ligne, ni à current, ni à Passenger. Explique l'échec le cas échéant.
set -uo pipefail
. "$(dirname "$0")/config.sh"
D="$(cd "$(dirname "$0")" && pwd)"
new="$(cat "$STATE/version-nouvelle.txt")"; PORT="${PORT:-3917}"; LOG=/tmp/art56-test.log
echo "Node : $("$NODE" -v) ; $(ldd --version 2>&1 | head -1)"
echo "Version testée : $new"

sonde() { "$NODE" "$D/sonde.mjs" "$PORT" "$1"; }
field() { "$NODE" -e 'const j=JSON.parse(process.argv[1]);console.log(j[process.argv[2]]??"")' "$1" "$2"; }

cd "$new/nodejs" || { echo "Dossier introuvable"; exit 1; }
PORT=$PORT HOSTNAME=127.0.0.1 NODE_ENV=production "$NODE" server.js >"$LOG" 2>&1 &
pid=$!; trap 'kill $pid 2>/dev/null || true' EXIT

echo "== Démarrage (attente jusqu'à 40 s)"
up=0
for i in $(seq 1 40); do
  kill -0 $pid 2>/dev/null || { echo "Le processus Node s'est ARRÊTÉ (après ${i}s)."; wait $pid; echo "Code de sortie : $?"; break; }
  r="$(sonde /robots.txt)"; c="$(field "$r" code)"
  if [ "$c" = "200" ]; then up=1; echo "Le serveur répond après ${i}s."; break; fi
  sleep 1
done

if [ "$up" != "1" ]; then
  echo "== DIAGNOSTIC (aucune réponse HTTP)"
  echo "processus vivant : $(kill -0 $pid 2>/dev/null && echo oui || echo non)"
  echo "dernière sonde : $r"
  hex=$(printf '%04X' "$PORT"); echo "sockets en écoute sur le port $PORT :"; grep -i ":$hex " /proc/net/tcp /proc/net/tcp6 2>/dev/null | awk '{print $1, $2, "état", $4}' || true
  echo "variables proxy définies (noms) : $(env | grep -ioE '^(http|https|all)_proxy' | tr '\n' ' ')"
  echo "journal du serveur :"; tail -15 "$LOG"
  if command -v curl >/dev/null; then echo "curl détaillé :"; curl -sS -v --noproxy '*' -m 8 "http://127.0.0.1:$PORT/robots.txt" 2>&1 | tail -8; fi
  echo "TEST EN ÉCHEC — site en ligne et current inchangés."; exit 1
fi

ok=1
for p in / /a-propos /contact /prestations /sitemap.xml /robots.txt /images/a-propos-artisan.jpg; do
  r="$(sonde "$p")"; c="$(field "$r" code)"; echo "$p -> $c"; [ "$c" = "200" ] || { ok=0; echo "   détail : $r"; }
done
r="$(sonde '/_next/image?url=%2Fimages%2Fa-propos-artisan.jpg&w=640&q=85')"
echo "optimisation d'image -> code $(field "$r" code) $(field "$r" type)"
case "$(field "$r" type)" in image/*) ;; *) echo "   (ATTENTION : l'optimisation d'image échoue ; la page reste servie. Me le signaler : correctif simple possible.)";; esac
echo "== Indexation"
for p in / /a-propos /contact; do r="$(sonde "$p")"; echo "$p -> robots : $(field "$r" robots)"; done
r="$(sonde /robots.txt)"; echo "robots.txt : serveur répond $(field "$r" code) (contenu attendu : Disallow: /)"
bad=$(for p in / /a-propos /contact; do r="$(sonde "$p")"; [ "$(field "$r" robots)" = "noindex, nofollow" ] || echo "$p"; done)
[ -z "$bad" ] || { echo "ATTENTION : pages NON bloquées à l'indexation : $bad"; ok=0; }
[ "$ok" = "1" ] && echo "TEST OK" || { echo "TEST EN ÉCHEC — journal : $LOG"; exit 1; }
