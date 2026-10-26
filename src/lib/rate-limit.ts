/**
 * Fixed-window in-memory rate limiter.
 * Suitable for a single server instance. On serverless or multi-instance hosting, replace
 * the store with a shared one (e.g. Upstash Redis or Vercel KV) using the same interface.
 */
const store = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const hits = (store.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    store.set(key, hits);
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - hits[0])) / 1000) };
  }
  hits.push(now);
  store.set(key, hits);
  if (store.size > 5000) {
    for (const [k, v] of store) if (v.every((t) => now - t >= windowMs)) store.delete(k);
  }
  return { ok: true, retryAfter: 0 };
}
