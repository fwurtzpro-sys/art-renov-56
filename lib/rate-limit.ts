/**
 * Limitation de débit en mémoire (fenêtre glissante), suffisante pour un
 * serveur Node.js unique. Pour plusieurs instances, remplacer par un stockage partagé.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);
  recent.push(now);
  hits.set(key, recent);

  // Nettoyage occasionnel pour éviter toute croissance de la mémoire
  if (hits.size > 5000) {
    for (const [entryKey, timestamps] of hits) {
      if (timestamps.every((timestamp) => now - timestamp >= windowMs)) hits.delete(entryKey);
    }
  }
  return recent.length > limit;
}
