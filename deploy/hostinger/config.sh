# Configuration commune — ART RÉNOV 56 sur Hostinger (Passenger).
H="${HBUILDS:-/home/u981858126/domains/dodgerblue-whale-931426.hostingersite.com/hbuilds}"
STATE="${DEPLOY_STATE:-$HOME/art-renov56-deploy}"
NODE="${NODE:-/opt/alt/alt-nodejs22/root/bin/node}"
[ -x "$NODE" ] || NODE="$(command -v node || true)"
[ -x "$NODE" ] || { echo "Node.js introuvable (attendu : /opt/alt/alt-nodejs22/root/bin/node)"; exit 1; }
